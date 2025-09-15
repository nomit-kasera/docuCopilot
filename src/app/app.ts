import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { DocumentTemplate, ProcessingHistoryItem } from './models/template.model';
import { TemplateService } from './services/template.services';
import { ApiService } from './services/api.services';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatTable, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-root',
  imports: [CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    MatBadgeModule,
    MatStepperModule,
    MatDividerModule, MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatTooltip],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  selectedTemplate: string | null = null
  uploadedFile: File | null = null
  processingStatus: "idle" | "processing" | "completed" | "error" = "idle"
  processedDocument: string | null = null
  activeTab: "templates" | "history" = "templates"
  activeTabIndex = 0

  templates: DocumentTemplate[] = []
  recentProcessing: ProcessingHistoryItem[] = [
    { id: 1, template: "Professional Resume", file: "my-experience.docx", status: "completed", time: "2 min ago" },
    { id: 2, template: "Business Proposal", file: "project-notes.pdf", status: "completed", time: "1 hour ago" },
    { id: 3, template: "Meeting Summary", file: "team-meeting.txt", status: "processing", time: "5 min ago" },
  ]

  constructor(
    private templateService: TemplateService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.templates = this.templateService.getTemplates()
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      this.uploadedFile = file
    }
  }

  selectTemplate(templateId: string): void {
    if (this.selectedTemplate === templateId) {
      this.selectedTemplate = ""
    } else {
      this.selectedTemplate = templateId
    }

  }

  async processDocument(): Promise<void> {
    if (!this.selectedTemplate || !this.uploadedFile) return

    this.processingStatus = "processing"

    try {
      const response = await this.apiService
        .processDocument({
          file: this.uploadedFile,
          templateId: this.selectedTemplate,
          templateName: this.getSelectedTemplateName()
        })
        .toPromise()

      if (response?.success) {
        this.processingStatus = "completed"
        this.processedDocument = response.processedContent || null
      } else {
        this.processingStatus = "error"
        console.error("Processing failed:", response?.error)
      }
    } catch (error) {
      this.processingStatus = "error"
      console.error("API call failed:", error)
    }
  }

  getSelectedTemplateName(): string {
    if (!this.selectedTemplate) return ""
    const template = this.templateService.getTemplateById(this.selectedTemplate)
    return template?.name || ""
  }

  getStepIndex(): number {
    if (this.processingStatus === "completed") return 2
    if (this.uploadedFile) return 1
    if (this.selectedTemplate) return 0
    return 0
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case "processing":
        return "schedule"
      case "completed":
        return "check_circle"
      case "error":
        return "error"
      default:
        return "description"
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case "processing":
        return "text-yellow-500 animate-spin"
      case "completed":
        return "text-green-500"
      case "error":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  formatFileSize(bytes: number): string {
    return (bytes / 1024 / 1024).toFixed(2) + " MB"
  }
}
