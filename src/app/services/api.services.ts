import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import type { Observable } from "rxjs"
import type { ProcessDocumentRequest, ProcessDocumentResponse } from "../models/template.model"

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = "/api"

  constructor(private http: HttpClient) {}

  processDocument(data: ProcessDocumentRequest): Observable<ProcessDocumentResponse> {
    const formData = new FormData()
    formData.append("file", data.file)
    formData.append("templateId", data.templateId)
    formData.append("templateName", data.templateName)

    return this.http.post<ProcessDocumentResponse>(`${this.baseUrl}/process-document`, formData)
  }

  getProcessingStatus(jobId: string): Observable<{ status: string; result?: string }> {
    return this.http.get<{ status: string; result?: string }>(`${this.baseUrl}/processing-status/${jobId}`)
  }

  uploadFile(file: File): Observable<{ success: boolean; fileId?: string; error?: string }> {
    const formData = new FormData()
    formData.append("file", file)

    return this.http.post<{ success: boolean; fileId?: string; error?: string }>(`${this.baseUrl}/upload`, formData)
  }
}
