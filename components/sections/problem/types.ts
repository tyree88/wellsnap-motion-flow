
import type React from "react"

export interface ProblemCard {
  id: string;
  title: string;
  description: string;
  impact: string;
  solution: string;
}

export interface ScrollSequenceSection {
  title: string;
  description?: string;
  bgColor: string;
  content: React.ReactNode;
}
