
"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLenis } from "@/hooks/useLenis"
import ProblemHeader from "./ProblemHeader"
import ProblemNavTabs from "./ProblemNavTabs"
import ProblemCard from "./ProblemCard"
import { problemCards } from "./problem-data"

// Register ScrollTrigger with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const ProblemSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const [activeCardIndex, setActiveCardIndex] = useState(0)

  // Initialize Lenis for smooth scrolling
  const { lenis } = useLenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  // Set up GSAP animations with ScrollTrigger
  useEffect(() => {
    if (!sectionRef.current || !cardsContainerRef.current || !tabsRef.current || typeof window === "undefined") return

    // Pin the tabs at the top when scrolling through problem cards
    const tabsPin = ScrollTrigger.create({
      trigger: tabsRef.current,
      start: "top top",
      endTrigger: cardsContainerRef.current,
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    })

    // Create a ScrollTrigger for each problem card
    const cardTriggers = problemCards.map((card, index) => {
      const cardElement = document.getElementById(card.id)
      if (!cardElement) return null

      return ScrollTrigger.create({
        trigger: cardElement,
        start: "top 40%",
        end: "bottom 40%",
        onEnter: () => setActiveCardIndex(index),
        onEnterBack: () => setActiveCardIndex(index),
      })
    })

    // Clean up ScrollTrigger instances when component unmounts
    return () => {
      tabsPin.kill()
      cardTriggers.forEach((trigger) => trigger?.kill())
    }
  }, [])

  // Scroll to the selected card when a tab is clicked
  const scrollToCard = (index: number) => {
    const cardId = problemCards[index].id
    const cardElement = document.getElementById(cardId)
    if (!cardElement) return

    if (lenis) {
      // Use Lenis for smooth scrolling to the element
      lenis.scrollTo(cardElement, {
        offset: -100,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else {
      // Fallback to standard scrolling
      cardElement.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative w-full bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/30"
    >
      {/* Header section */}
      <ProblemHeader />

      {/* Problem cards with pinned navigation */}
      <div className="relative">
        {/* Navigation tabs - will be pinned via GSAP */}
        <div ref={tabsRef}>
          <ProblemNavTabs 
            problemCards={problemCards} 
            activeCardIndex={activeCardIndex} 
            scrollToCard={scrollToCard} 
          />
        </div>

        {/* Cards content */}
        <div ref={cardsContainerRef} className="relative">
          {problemCards.map((card, index) => (
            <ProblemCard
              key={card.id}
              card={card}
              index={index}
              activeCardIndex={activeCardIndex}
              scrollToCard={scrollToCard}
            />
          ))}
        </div>
      </div>

      {/* Custom CSS for visual effects */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}

export default ProblemSection
