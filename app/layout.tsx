import './globals.css'
import { SiteNav } from '@/app/components/SiteNav'
import { EcosystemFooter } from '@/app/components/EcosystemFooter'

const SITE_URL = 'https://debt-defense.pages.dev'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Debt Defense | Debt Validation, Collection Dispute & Credit Report Workflows',
  description: 'Focused workflows for debt validation, collection agency disputes, medical debt, credit report collections, student loan disputes, and stop-contact requests. Upload the collection letter, organize evidence, draft a dispute, review, and mail with proof.',
  keywords: ['debt collection dispute','dispute letter for collections','debt validation','debt dispute letter','dispute collection agency','debt collection dispute letter','dispute medical collections','student loan dispute letter','dispute collections on credit report','debt collector dispute letter','contest a debt','stop collection calls','debt verification letter'],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Debt Defense | Debt Validation & Collection Dispute Workflows',
    description: 'Find the right workflow for disputing a debt, validating a collection, or correcting credit report entries. Upload the letter, organize evidence, and build a supported dispute.',
    type: 'website',
    siteName: 'Debt Defense',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Defense | Debt Validation & Collection Dispute',
    description: 'Debt validation, collection disputes, and credit report corrections with document analysis, evidence organization, and proof of delivery.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SiteNav />
        <main>{children}</main>
        <EcosystemFooter />
      </body>
    </html>
  )
}
