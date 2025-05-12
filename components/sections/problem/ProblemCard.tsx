
"use client"

import { motion } from "framer-motion"
import { type ProblemCard as ProblemCardType } from "./types"

interface ProblemCardProps {
  card: ProblemCardType
  index: number
  activeCardIndex: number
  scrollToCard: (index: number) => void
}

const ProblemCard = ({ card, index, activeCardIndex, scrollToCard }: ProblemCardProps) => {
  return (
    <div id={card.id} className="problem-card min-h-screen w-full flex flex-col items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-6xl mx-auto"
      >
        <div className="w-full bg-slate-900/80 backdrop-blur-sm px-8 pt-8 pb-16 md:px-12 md:pt-10 md:pb-20 rounded-2xl shadow-xl border border-indigo-500/20">
          <h3 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400 mb-8 text-center">
            {card.title}
          </h3>

          <p className="text-2xl md:text-3xl text-slate-300 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
            {card.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-indigo-500/20">
              <h4 className="text-xl font-semibold mb-4 text-pink-300">Impact</h4>
              <p className="text-slate-300">{card.impact}</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-indigo-500/20">
              <h4 className="text-xl font-semibold mb-4 text-indigo-300">Solution Approach</h4>
              <p className="text-slate-300">{card.solution}</p>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center mt-16 space-x-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-12 bg-gradient-to-r from-pink-500 to-indigo-500"
                    : "w-4 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProblemCard
