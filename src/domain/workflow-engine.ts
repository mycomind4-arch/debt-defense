/**
 * Debt Defense — Workflow Engine
 * Domain-specific analysis, drafting, validation, and pricing for debt disputes and validation requests.
 */

export interface DebtAnalysisResult {
  summary: string;
  debtType: string;
  collector: string;
  originalCreditor: string;
  accountNumber: string;
  amountClaimed: string;
  collectionDate: string;
  validationDeadline: string;
  keyFacts: string[];
  issues: { issue: string; whyItMatters: string; evidenceNeeded: string[] }[];
  confidence: "high" | "medium" | "low";
}

export interface DebtDraftConfig {
  workflowId: string;
  workflowName: string;
  systemPrompt: string;
  validationPrompt: string;
  requiredSections: string[];
  forbiddenPhrases: string[];
  pricing: {
    preparationFee: number;
    includedResponsePages: number;
    supportingPagePrice: number;
    standardMail: number;
    certifiedMail: number;
    registeredMail: number;
    largePacketThresholdSheets: number;
    largePacketFee: number;
  };
}

export const DEBT_WORKFLOW_CONFIGS: Record<string, DebtDraftConfig> = {
  "debt-validation": {
    workflowId: "debt-validation",
    workflowName: "Request Debt Validation",
    systemPrompt: "Draft a factual, precise request debt validation letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this request debt validation draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "debt-dispute": {
    workflowId: "debt-dispute",
    workflowName: "Dispute a Debt in Collections",
    systemPrompt: "Draft a factual, precise dispute a debt in collections letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this dispute a debt in collections draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "collection-dispute": {
    workflowId: "collection-dispute",
    workflowName: "Dispute a Collection Agency",
    systemPrompt: "Draft a factual, precise dispute a collection agency letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this dispute a collection agency draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "debt-collector-dispute": {
    workflowId: "debt-collector-dispute",
    workflowName: "Respond to a Debt Collector",
    systemPrompt: "Draft a factual, precise respond to a debt collector letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this respond to a debt collector draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "dispute-letter": {
    workflowId: "dispute-letter",
    workflowName: "Dispute Letter for Collections",
    systemPrompt: "Draft a factual, precise dispute letter for collections letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this dispute letter for collections draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "debt-dispute-letter": {
    workflowId: "debt-dispute-letter",
    workflowName: "Debt Dispute Letter",
    systemPrompt: "Draft a factual, precise debt dispute letter letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this debt dispute letter draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "validation-request": {
    workflowId: "validation-request",
    workflowName: "Debt Verification Request",
    systemPrompt: "Draft a factual, precise debt verification request letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this debt verification request draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "medical-debt-dispute": {
    workflowId: "medical-debt-dispute",
    workflowName: "Dispute Medical Collections",
    systemPrompt: "Draft a factual, precise dispute medical collections letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this dispute medical collections draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "medical-bill-dispute": {
    workflowId: "medical-bill-dispute",
    workflowName: "Dispute Medical Bill Collections",
    systemPrompt: "Draft a factual, precise dispute medical bill collections letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this dispute medical bill collections draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "credit-report-dispute": {
    workflowId: "credit-report-dispute",
    workflowName: "Dispute Collections on Credit Report",
    systemPrompt: "Draft a factual, precise dispute collections on credit report letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this dispute collections on credit report draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "credit-collection-dispute": {
    workflowId: "credit-collection-dispute",
    workflowName: "Dispute a Credit Collection",
    systemPrompt: "Draft a factual, precise dispute a credit collection letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this dispute a credit collection draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "student-loan-dispute": {
    workflowId: "student-loan-dispute",
    workflowName: "Student Loan Dispute Letter",
    systemPrompt: "Draft a factual, precise student loan dispute letter letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this student loan dispute letter draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "private-student-loan-dispute": {
    workflowId: "private-student-loan-dispute",
    workflowName: "Dispute Private Student Loan Collections",
    systemPrompt: "Draft a factual, precise dispute private student loan collections letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this dispute private student loan collections draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "stop-contact": {
    workflowId: "stop-contact",
    workflowName: "Stop Collection Calls",
    systemPrompt: "Draft a factual, precise stop collection calls letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this stop collection calls draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "cease-desist": {
    workflowId: "cease-desist",
    workflowName: "Cease and Desist Collection Letter",
    systemPrompt: "Draft a factual, precise cease and desist collection letter letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this cease and desist collection letter draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "harassment-complaint": {
    workflowId: "harassment-complaint",
    workflowName: "File a Collection Harassment Complaint",
    systemPrompt: "Draft a factual, precise file a collection harassment complaint letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this file a collection harassment complaint draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "collection-lawsuit-response": {
    workflowId: "collection-lawsuit-response",
    workflowName: "Respond to a Collection Lawsuit",
    systemPrompt: "Draft a factual, precise respond to a collection lawsuit letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this respond to a collection lawsuit draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "summons-response": {
    workflowId: "summons-response",
    workflowName: "Respond to a Collection Summons",
    systemPrompt: "Draft a factual, precise respond to a collection summons letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this respond to a collection summons draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "court-appearance-prep": {
    workflowId: "court-appearance-prep",
    workflowName: "Prepare for a Collection Court Appearance",
    systemPrompt: "Draft a factual, precise prepare for a collection court appearance letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this prepare for a collection court appearance draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "wage-garnishment-objection": {
    workflowId: "wage-garnishment-objection",
    workflowName: "Object to Wage Garnishment",
    systemPrompt: "Draft a factual, precise object to wage garnishment letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this object to wage garnishment draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "garnishment-exemption": {
    workflowId: "garnishment-exemption",
    workflowName: "Claim Garnishment Exemptions",
    systemPrompt: "Draft a factual, precise claim garnishment exemptions letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this claim garnishment exemptions draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "account-documentation-request": {
    workflowId: "account-documentation-request",
    workflowName: "Request Account Documentation",
    systemPrompt: "Draft a factual, precise request account documentation letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this request account documentation draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "debt-verification-request": {
    workflowId: "debt-verification-request",
    workflowName: "Debt Verification Request",
    systemPrompt: "Draft a factual, precise debt verification request letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this debt verification request draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "balance-dispute": {
    workflowId: "balance-dispute",
    workflowName: "Dispute an Incorrect Balance",
    systemPrompt: "Draft a factual, precise dispute an incorrect balance letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this dispute an incorrect balance draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "incorrect-balance-dispute": {
    workflowId: "incorrect-balance-dispute",
    workflowName: "Dispute Wrong Collection Amount",
    systemPrompt: "Draft a factual, precise dispute wrong collection amount letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this dispute wrong collection amount draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "identity-theft-debt": {
    workflowId: "identity-theft-debt",
    workflowName: "Dispute Identity Theft Debt",
    systemPrompt: "Draft a factual, precise dispute identity theft debt letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this dispute identity theft debt draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "wrongful-collection": {
    workflowId: "wrongful-collection",
    workflowName: "Dispute Wrongful Collection",
    systemPrompt: "Draft a factual, precise dispute wrongful collection letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this dispute wrongful collection draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "time-barred-debt": {
    workflowId: "time-barred-debt",
    workflowName: "Dispute Time-Barred Debt",
    systemPrompt: "Draft a factual, precise dispute time-barred debt letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this dispute time-barred debt draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "statute-of-limitations": {
    workflowId: "statute-of-limitations",
    workflowName: "Statute of Limitations Defense",
    systemPrompt: "Draft a factual, precise statute of limitations defense letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this statute of limitations defense draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "debt-settlement-letter": {
    workflowId: "debt-settlement-letter",
    workflowName: "Debt Settlement Offer Letter",
    systemPrompt: "Draft a factual, precise debt settlement offer letter letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this debt settlement offer letter draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  },
  "pay-for-delete-letter": {
    workflowId: "pay-for-delete-letter",
    workflowName: "Pay-for-Delete Negotiation Letter",
    systemPrompt: "Draft a factual, precise pay-for-delete negotiation letter letter. Address the specific debt/collection issue, statutory rights, and factual basis. Cite supplied evidence references. Never invent facts, amounts, account numbers, or admissions. Distinguish established facts from arguments.",
    validationPrompt: "Audit this pay-for-delete negotiation letter draft. Check for account number consistency, amount accuracy, FDCPA references, deadline compliance, and that no debt is acknowledged. Return JSON: {valid:boolean, issues:string[], suggestions:string[]}.",
    requiredSections: ["Dear", "Sincerely", "Re:"],
    forbiddenPhrases: ["I acknowledge this debt", "I admit", "I will pay", "I owe"],
    pricing: { preparationFee: 29, includedResponsePages: 3, supportingPagePrice: 0.25, standardMail: 1.15, certifiedMail: 4.35, registeredMail: 15.40, largePacketThresholdSheets: 10, largePacketFee: 5.00 },
  }
};

export function getDebtWorkflowConfig(workflowId: string): DebtDraftConfig | undefined {
  return DEBT_WORKFLOW_CONFIGS[workflowId] ?? DEBT_WORKFLOW_CONFIGS["debt-validation"];
}

export function calculateDebtPricing(
  config: DebtDraftConfig,
  supportingSheets: number,
  mailingMethod: "standard" | "certified" | "registered",
) {
  const P = config.pricing;
  const mailing = mailingMethod === "standard" ? P.standardMail : mailingMethod === "certified" ? P.certifiedMail : P.registeredMail;
  const largePacket = supportingSheets + P.includedResponsePages >= P.largePacketThresholdSheets ? P.largePacketFee : 0;
  const total = P.preparationFee + supportingSheets * P.supportingPagePrice + mailing + largePacket;
  return { preparationFee: P.preparationFee, includedResponsePages: P.includedResponsePages, supportingSheets, mailingMethod, mailingFee: mailing, largePacketFee: largePacket, total: Number(total.toFixed(2)) };
}
