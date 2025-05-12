
"use client"

import type React from "react"
import { FlowButton } from "./flow-button"

export function AnimatedButton({
  children,
  onClick,
  className,
  href,
  ...props
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  href?: string
  [key: string]: any
}) {
  if (href) {
    return (
      <FlowButton 
        asLink={true} 
        href={href} 
        className={className} 
        {...props}
      >
        {children}
      </FlowButton>
    )
  }
  
  return (
    <FlowButton 
      onClick={onClick} 
      className={className} 
      {...props}
    >
      {children}
    </FlowButton>
  )
}
