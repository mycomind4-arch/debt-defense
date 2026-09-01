"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SSOCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const hash = window.location.hash.slice(1);
      const params = new URLSearchParams(hash);
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      const expiresIn = params.get("expires_in");
      const returnTo = params.get("return_to");

      if (!accessToken || !refreshToken) {
        setError("Missing authentication tokens. Please try signing in again.");
        return;
      }

      try {
        const configRes = await fetch("/api/auth/config");
        const config = configRes.ok ? await configRes.json() : null;
        if (!config?.configured) {
          setError("Account services are not configured.");
          return;
        }

        const userRes = await fetch(config.url + "/auth/v1/user", {
          headers: { apikey: config.anonKey, Authorization: `Bearer ${accessToken}` },
        });
        const user = userRes.ok ? await userRes.json() : null;

        const stored = {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_at: Date.now() + (parseInt(expiresIn || "3600")) * 1000,
          user: { id: user?.id || "", email: user?.email || "" },
        };
        localStorage.setItem("mailmypdf_session", JSON.stringify(stored));

        if (window.self !== window.top) {
          window.parent.postMessage({ type: "sso-callback", success: true, origin: window.location.origin }, "*");
          return;
        }

        router.push(returnTo || "/");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to establish session.");
      }
    })();
  }, [router]);

  if (error) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f6f1e7" }}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 400 }}>Sign-in problem</h1>
          <p style={{ color: "#dc2626", fontSize: "0.875rem" }}>{error}</p>
          <a href="/" style={{ display: "inline-block", marginTop: "1.5rem", padding: "0.5rem 1.25rem", borderRadius: "9999px", background: "#1a1d2e", color: "#fff", textDecoration: "none", fontSize: "0.875rem" }}>Back to sign in</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f6f1e7" }}>
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 400 }}>Signing you in…</h1>
        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Connecting your MailMyPDF account.</p>
      </div>
    </div>
  );
}
