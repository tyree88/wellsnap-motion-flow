
"use client"

import React from "react"
import { type ProblemCard } from "./types"

interface ProblemNavTabsProps {
  problemCards: ProblemCard[]
  activeCardIndex: number
  scrollToCard: (index: number) => void
}

const ProblemNavTabs = ({ problemCards, activeCardIndex, scrollToCard }: ProblemNavTabsProps) => {
  return (
    <div className="w-full bg-slate-950/90 backdrop-blur-md border-b border-indigo-500/20 shadow-lg py-4 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto hide-scrollbar">
          {problemCards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => scrollToCard(index)}
              className={`flex-shrink-0 px-4 py-2 mx-1 rounded-full text-sm font-medium transition-colors ${
                activeCardIndex === index
                  ? "bg-gradient-to-r from-pink-500/20 to-indigo-500/20 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {card.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProblemNavTabs
