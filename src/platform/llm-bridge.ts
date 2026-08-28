/** LLM Bridge — adapts @mailmypdf/ai to debt-defense's LLM service API. */
import {
  routeLLMRequest, getLLMConfig, _setLLMConfig, _resetLLMConfig,
  isLLMAvailable, getConfiguredProviderList,
  type LLMProviderId, type LLMFullProvenance, type LLMRequest,
} from '@mailmypdf/ai';

export type LLMProvider = 'gemini' | 'claude' | 'openai';

function mapProviderName(name: string): LLMProviderId | null {
  switch (name) {
    case 'gemini': return 'gemini';
    case 'claude': case 'anthropic': return 'anthropic';
    case 'openai': return 'openai';
    default: return null;
  }
}

export interface LLMConfig { provider: LLMProvider; model?: string; temperature?: number; maxTokens?: number; }
export interface LLMMessage { role: 'system' | 'user' | 'assistant'; content: string; }
export interface LLMResponse { text: string; provider: LLMProvider; model: string; usage?: { inputTokens?: number; outputTokens?: number; }; provenance?: LLMFullProvenance; }

export function getAvailableProviders(): LLMProvider[] {
  const configured = getConfiguredProviderList(getLLMConfig());
  return configured.map((p) => p === 'anthropic' ? 'claude' : p as LLMProvider);
}

export function isProviderAvailable(provider: LLMProvider): boolean {
  const mapped = mapProviderName(provider);
  if (!mapped) return false;
  return getConfiguredProviderList(getLLMConfig()).includes(mapped);
}

export function getDefaultModel(provider: LLMProvider): string {
  const models: Record<LLMProvider, string> = { gemini: 'gemini-2.0-flash', claude: 'claude-sonnet-4-20250514', openai: 'gpt-4o' };
  return models[provider] ?? 'unknown';
}

export async function callLLM(messages: LLMMessage[], config: LLMConfig): Promise<LLMResponse> {
  if (!isLLMAvailable()) throw new Error('No LLM provider is configured.');
  const mappedProvider = mapProviderName(config.provider);
  if (!mappedProvider) {
    const available = getAvailableProviders();
    if (available.length === 0) throw new Error('No LLM provider is configured.');
    return callLLM(messages, { ...config, provider: available[0] });
  }
  const systemPrompt = messages.find((m) => m.role === 'system')?.content ?? '';
  const userPrompt = messages.filter((m) => m.role !== 'system').map((m) => m.content).join('\n\n');
  const request: LLMRequest = { systemPrompt, userPrompt, temperature: config.temperature, maxTokens: config.maxTokens };
  const result = await routeLLMRequest(request, { operation: 'analyze', provider: mappedProvider });
  if (!result) throw new Error(`Provider ${config.provider} is not available and no fallback succeeded.`);
  const providerName: LLMProvider = result.provenance.provider === 'anthropic' ? 'claude' : result.provenance.provider as LLMProvider;
  return { text: result.content, provider: providerName, model: result.provenance.model, provenance: result.provenance };
}

export { _setLLMConfig, _resetLLMConfig };
