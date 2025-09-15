export interface DocumentTemplate {
  id: string
  name: string
  description: string
  icon: string
  category: string
  color: string
}

export interface ProcessingHistoryItem {
  id: number
  template: string
  file: string
  status: "idle" | "processing" | "completed" | "error"
  time: string
}

export interface ProcessDocumentRequest {
  file: File
  templateId: string,
  templateName: string
}

export interface ProcessDocumentResponse {
  success: boolean
  processedContent?: string
  error?: string
  jobId?: string
}
