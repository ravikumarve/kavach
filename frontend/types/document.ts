export enum DocumentStatus {
  DRAFT = "draft",
  GENERATING = "generating",
  COMPLETED = "completed",
  FAILED = "failed",
}

export enum DocumentType {
  NDA = "nda",
  FREELANCE_CONTRACT = "freelance_contract",
  RENT_AGREEMENT = "rent_agreement",
  VENDOR_AGREEMENT = "vendor_agreement",
  OFFER_LETTER = "offer_letter",
  PARTNERSHIP_DEED = "partnership_deed",
  SERVICE_AGREEMENT = "service_agreement",
  CONSULTANT_AGREEMENT = "consultant_agreement",
}

export interface Document {
  id: string
  title: string
  type: DocumentType
  status: DocumentStatus
  content: string
  metadata: Record<string, any>
  created_at: string
  updated_at: string
  user_id: string
}

export interface Template {
  id: string
  name: string
  type: DocumentType
  description: string
  category: string
  is_premium: boolean
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  name: string
  plan: string
  documents_used: number
  documents_limit: number
  created_at: string
  updated_at: string
}
