import "server-only"

const ENDPOINT = "https://texttospeech.googleapis.com/v1/text:synthesize"
const DEFAULT_TIMEOUT_MS = 5_000

type SynthesizeBody = {
  input: { text: string }
  voice: { languageCode: string; name: string }
  audioConfig: { audioEncoding: "MP3" }
}

type SynthesizeResponse = {
  audioContent?: string
  error?: { message?: string; status?: string }
}

export class TTSError extends Error {
  constructor(message: string, readonly status: number) {
    super(message)
    this.name = "TTSError"
  }
}

export async function generateSpeech(text: string): Promise<ArrayBuffer> {
  const apiKey = process.env.GOOGLE_TTS_API_KEY?.trim()
  if (!apiKey) {
    throw new TTSError("GOOGLE_TTS_API_KEY not configured", 500)
  }

  const trimmed = text.trim()
  if (!trimmed) {
    throw new TTSError("text is empty", 400)
  }

  const body: SynthesizeBody = {
    input: { text: trimmed },
    voice: { languageCode: "ko-KR", name: "ko-KR-Neural2-A" },
    audioConfig: { audioEncoding: "MP3" },
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS)

  let res: Response
  try {
    res = await fetch(`${ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new TTSError("Google TTS timeout", 504)
    }
    throw new TTSError("Google TTS network error", 502)
  } finally {
    clearTimeout(timeout)
  }

  if (!res.ok) {
    throw new TTSError(`Google TTS HTTP ${res.status}`, 502)
  }

  const payload = (await res.json()) as SynthesizeResponse
  if (payload.error || !payload.audioContent) {
    throw new TTSError(payload.error?.message ?? "no audioContent", 502)
  }

  // base64 → ArrayBuffer (Node runtime: Buffer 사용).
  const buf = Buffer.from(payload.audioContent, "base64")
  // Buffer 슬라이스 후 ArrayBuffer 부분만 추출.
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
}
