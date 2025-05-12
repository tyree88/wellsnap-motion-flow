
"use client"

import { useState, useEffect, useRef } from "react"
import Lenis from "@studio-freight/lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface LenisOptions {
  duration?: number
  easing?: (t: number) => number
  orientation?: "vertical" | "horizontal"
  gestureOrientation?: "vertical" | "horizontal"
  smoothWheel?: boolean
  smoothTouch?: boolean
  touchMultiplier?: number
  wheelMultiplier?: number
}

/**
 * Default easing function for Lenis smooth scrolling
 */
const defaultEasing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

/**
 * Default Lenis configuration options
 */
const defaultLenisOptions: LenisOptions = {
  duration: 1.2,
  easing: defaultEasing,
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
}

/**
 * Setup GSAP ScrollTrigger integration with Lenis
 */
function setupScrollTriggerIntegration(lenisInstance: Lenis) {
  // Set up GSAP ScrollTrigger integration
  ScrollTrigger.scrollerProxy(window, {
    scrollTop(value) {
      if (arguments.length && value !== undefined) {
        lenisInstance.scrollTo(value)
      }
      return lenisInstance.scroll
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
  })

  // Update ScrollTrigger on Lenis scroll
  lenisInstance.on('scroll', () => {
    ScrollTrigger.update()
  })
}

/**
 * Setup and manage RAF (Request Animation Frame) for Lenis
 */
function setupRAF(lenisInstance: Lenis) {
  const reqIdRef = useRef<number | null>(null)
  
  function raf(time: number) {
    lenisInstance.raf(time)
    reqIdRef.current = requestAnimationFrame(raf)
  }

  reqIdRef.current = requestAnimationFrame(raf)

  // Return cleanup function
  return () => {
    if (reqIdRef.current) {
      cancelAnimationFrame(reqIdRef.current)
      reqIdRef.current = null
    }
  }
}

/**
 * Hook to create and manage a Lenis smooth scrolling instance
 */
export function useLenis(options?: LenisOptions) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const optionsRef = useRef(options)

  useEffect(() => {
    // Only update the ref if options actually changed
    if (JSON.stringify(optionsRef.current) !== JSON.stringify(options)) {
      optionsRef.current = options
    }
  }, [options])

  useEffect(() => {
    if (typeof window === "undefined") return
    
    // Create Lenis instance with merged options
    const lenisInstance = new Lenis({
      ...defaultLenisOptions,
      ...optionsRef.current,
    })

    setLenis(lenisInstance)

    // Setup GSAP ScrollTrigger integration
    setupScrollTriggerIntegration(lenisInstance)

    // Setup RAF loop and get cleanup function
    const cleanupRAF = setupRAF(lenisInstance)

    // Return cleanup function
    return () => {
      cleanupRAF()
      lenisInstance.destroy()
      setLenis(null)
    }
  }, []) // Empty dependency array to run only once

  return { lenis }
}
