
"use client"

import { motion } from "framer-motion"

const ProblemHeader = () => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center py-24 px-6">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="inline-block px-4 py-1.5 text-sm font-medium bg-white/10 text-pink-300 rounded-full mb-6"
      >
        The Challenge
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-6xl font-bold text-white mb-6"
      >
        Problems We Solve
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xl text-slate-300 max-w-3xl"
      >
        Identifying the key challenges in modern digital experiences
      </motion.p>
    </div>
  )
}

export default ProblemHeader
