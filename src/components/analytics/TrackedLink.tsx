"use client"

import type { CSSProperties, ReactNode } from "react"
import Link from "next/link"
import { trackEvent } from "@/lib/analytics"

type TrackedLinkProps = {
  href: string
  event: string
  params?: Record<string, unknown>
  children: ReactNode
  style?: CSSProperties
  className?: string
  target?: string
  rel?: string
  "aria-label"?: string
  /** true면 next/link 대신 일반 <a>로 렌더 (외부 링크). */
  external?: boolean
}

/**
 * 클릭 시 GA4 이벤트를 먼저 보내고 정상 네비게이션을 그대로 유지하는 링크.
 * external=false(기본)면 next/link, true면 <a>를 렌더한다.
 * Hero 등 서버 컴포넌트에서 children으로 사용 가능한 client 래퍼.
 */
export function TrackedLink({
  href,
  event,
  params,
  children,
  style,
  className,
  target,
  rel,
  "aria-label": ariaLabel,
  external = false,
}: TrackedLinkProps) {
  const handleClick = () => {
    trackEvent(event, params)
  }

  if (external) {
    return (
      <a
        href={href}
        onClick={handleClick}
        style={style}
        className={className}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      style={style}
      className={className}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  )
}
