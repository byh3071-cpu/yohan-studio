import { sendGAEvent } from "@next/third-parties/google"

/** GA4 커스텀 이벤트 전송. GA 미초기화 시 내부적으로 no-op. */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  sendGAEvent("event", name, params ?? {})
}
