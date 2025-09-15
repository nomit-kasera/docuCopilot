import { Injectable } from "@angular/core"
import type { DocumentTemplate } from "../models/template.model"

@Injectable({
  providedIn: "root",
})
export class TemplateService {
  private templates: DocumentTemplate[] = [
    {
      id: "resume",
      name: "Professional Resume",
      description: "Transform any document into a polished, ATS-friendly resume",
      icon: "work", // Updated to Material Design icon names
      category: "Career",
      color: "bg-blue-500",
    },
    {
      id: "cover-letter",
      name: "Cover Letter",
      description: "Generate compelling cover letters from your experience",
      icon: "mail", // Updated to Material Design icon names
      category: "Career",
      color: "bg-green-500",
    },
    {
      id: "business-proposal",
      name: "Business Proposal",
      description: "Convert ideas into professional business proposals",
      icon: "business", // Updated to Material Design icon names
      category: "Business",
      color: "bg-purple-500",
    },
    {
      id: "research-paper",
      name: "Research Paper",
      description: "Format content into academic research paper structure",
      icon: "school", // Updated to Material Design icon names
      category: "Academic",
      color: "bg-orange-500",
    },
    {
      id: "presentation",
      name: "Presentation Slides",
      description: "Transform content into structured presentation format",
      icon: "slideshow", // Updated to Material Design icon names
      category: "Business",
      color: "bg-cyan-500",
    },
    {
      id: "report",
      name: "Executive Report",
      description: "Create comprehensive executive reports from raw data",
      icon: "assessment", // Updated to Material Design icon names
      category: "Business",
      color: "bg-red-500",
    },
    {
      id: "meeting-notes",
      name: "Meeting Summary",
      description: "Organize notes into structured meeting summaries",
      icon: "groups", // Updated to Material Design icon names
      category: "Productivity",
      color: "bg-indigo-500",
    },
    {
      id: "documentation",
      name: "Technical Documentation",
      description: "Convert technical content into clear documentation",
      icon: "menu_book", // Updated to Material Design icon names
      category: "Technical",
      color: "bg-teal-500",
    },
  ]

  getTemplates(): DocumentTemplate[] {
    return this.templates
  }

  getTemplateById(id: string): DocumentTemplate | undefined {
    return this.templates.find((template) => template.id === id)
  }
}
