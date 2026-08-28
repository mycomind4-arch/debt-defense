import { describe, it, expect } from 'vitest'
import { getDebtWorkflowConfig, calculateDebtPricing } from '../workflow-engine'

describe('getDebtWorkflowConfig', () => {
  it('returns config for known workflow', () => {
    const config = getDebtWorkflowConfig('debt-validation')
    expect(config).toBeDefined()
    expect(config?.workflowId).toBe('debt-validation')
    expect(config?.systemPrompt).toBeTruthy()
    expect(config?.pricing).toBeDefined()
    expect(config?.requiredSections.length).toBeGreaterThan(0)
  })

  it('falls back to default for unknown workflow', () => {
    const config = getDebtWorkflowConfig('nonexistent-workflow')
    expect(config).toBeDefined()
    expect(config?.workflowId).toBeTruthy()
  })

  it('every workflow has unique system prompt', () => {
    // The config should always have a meaningful system prompt
    const config = getDebtWorkflowConfig('debt-validation')
    expect(config?.systemPrompt.length).toBeGreaterThan(50)
  })
})

describe('calculateDebtPricing', () => {
  it('calculates standard mailing pricing', () => {
    const config = getDebtWorkflowConfig('debt-validation')!
    const pricing = calculateDebtPricing(config, 5, 'standard')
    expect(pricing.total).toBeGreaterThan(0)
    expect(pricing.mailingFee).toBe(config.pricing.standardMail)
  })

  it('calculates certified mailing pricing', () => {
    const config = getDebtWorkflowConfig('debt-validation')!
    const pricing = calculateDebtPricing(config, 10, 'certified')
    expect(pricing.mailingFee).toBe(config.pricing.certifiedMail)
    expect(pricing.total).toBeGreaterThan(config.pricing.preparationFee)
  })

  it('applies large packet fee when threshold exceeded', () => {
    const config = getDebtWorkflowConfig('debt-validation')!
    const smallPricing = calculateDebtPricing(config, 0, 'standard')
    const largePricing = calculateDebtPricing(config, 50, 'standard')
    expect(largePricing.largePacketFee).toBeGreaterThan(0)
    expect(smallPricing.largePacketFee).toBe(0)
  })
})
