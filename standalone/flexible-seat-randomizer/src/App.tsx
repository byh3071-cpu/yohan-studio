import { useMemo, useState } from "react"
import {
  assignSeats,
  type Assignment,
  type AttendanceStatus,
  type Participant,
} from "./shuffle"

const STATUS_LABELS: Record<AttendanceStatus, string> = {
  present: "출석",
  late: "지각",
  sick: "병가",
  leave: "월차",
  "half-day": "반차",
  other: "기타",
}

const DEFAULT_PARTICIPANTS: Participant[] = [
  {
    id: "fixed-a",
    name: "가상 고정 인원 A",
    status: "present",
    participates: true,
    fixedSeat: "고정 좌석 A",
  },
  {
    id: "fixed-b",
    name: "가상 고정 인원 B",
    status: "present",
    participates: true,
    fixedSeat: "고정 좌석 B",
  },
  ...Array.from({ length: 13 }, (_, index): Participant => ({
    id: `participant-${index + 1}`,
    name: `가상 참여자 ${String(index + 1).padStart(2, "0")}`,
    status: "present",
    participates: true,
  })),
]

const RANDOM_SEATS = Array.from(
  { length: 13 },
  (_, index) => `자리 ${String(index + 1).padStart(2, "0")}`,
)

function safeFileName() {
  return `anonymous-seat-assignment-${new Date().toISOString().slice(0, 10)}.png`
}

function downloadAssignments(assignments: Assignment[]) {
  const canvas = document.createElement("canvas")
  canvas.width = 1200
  canvas.height = 180 + Math.ceil(assignments.length / 3) * 130
  const context = canvas.getContext("2d")
  if (!context) return

  context.fillStyle = "#f4f1ea"
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = "#0a0a0a"
  context.font = "700 42px sans-serif"
  context.fillText("익명 랜덤 자리배치 결과", 60, 75)
  context.font = "22px sans-serif"
  context.fillStyle = "#6b6357"
  context.fillText("이 이미지는 브라우저 안에서만 생성됩니다.", 60, 115)

  assignments.forEach((item, index) => {
    const column = index % 3
    const row = Math.floor(index / 3)
    const x = 60 + column * 380
    const y = 160 + row * 130
    context.fillStyle = item.fixed ? "#ff5c28" : "#ffffff"
    context.strokeStyle = "#0a0a0a"
    context.lineWidth = 3
    context.fillRect(x, y, 340, 96)
    context.strokeRect(x, y, 340, 96)
    context.fillStyle = "#0a0a0a"
    context.font = "700 20px sans-serif"
    context.fillText(item.seat, x + 18, y + 33)
    context.font = "18px sans-serif"
    context.fillText(item.name, x + 18, y + 68)
  })

  canvas.toBlob((blob) => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = safeFileName()
    anchor.click()
    URL.revokeObjectURL(url)
  }, "image/png")
}

export default function App() {
  const [participants, setParticipants] = useState(DEFAULT_PARTICIPANTS)
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [error, setError] = useState("")

  const activeCount = useMemo(
    () => participants.filter((person) => person.participates).length,
    [participants],
  )

  const updateParticipant = (
    id: string,
    patch: Partial<Pick<Participant, "name" | "status" | "participates">>,
  ) => {
    setParticipants((current) =>
      current.map((person) => (person.id === id ? { ...person, ...patch } : person)),
    )
    setAssignments([])
    setError("")
  }

  const runAssignment = () => {
    try {
      setAssignments(assignSeats(participants, RANDOM_SEATS))
      setError("")
    } catch (cause) {
      setAssignments([])
      setError(cause instanceof Error ? cause.message : "자리배치에 실패했습니다.")
    }
  }

  const reset = () => {
    setParticipants(DEFAULT_PARTICIPANTS)
    setAssignments([])
    setError("")
  }

  return (
    <main>
      <header className="hero">
        <div>
          <p className="eyebrow">ANONYMIZED FIELD CASE · RECONSTRUCTION</p>
          <h1>익명 랜덤 자리배치기</h1>
          <p className="lead">
            종이 제비 누락과 재추첨 문제를 해결한 현장 프로젝트를 가상 데이터로
            다시 만들었습니다. 입력값은 서버로 전송하거나 저장하지 않습니다.
          </p>
        </div>
        <div className="stat" aria-label="현재 참여 인원">
          <strong>{activeCount}</strong>
          <span>배정 포함 인원</span>
        </div>
      </header>

      <section className="privacy" aria-label="개인정보 안내">
        <strong>개인정보 원칙</strong>
        <span>가상 명단 기본값 · 서버/DB 없음 · 새로고침 시 입력 삭제</span>
      </section>

      <section className="panel" aria-labelledby="attendance-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">STEP 01</p>
            <h2 id="attendance-title">출석과 배정 여부</h2>
          </div>
          <button type="button" className="button secondary" onClick={reset}>
            가상 명단 초기화
          </button>
        </div>

        <div className="participant-list">
          {participants.map((person) => (
            <article className="participant" key={person.id}>
              <label>
                <span>표시 이름</span>
                <input
                  value={person.name}
                  onChange={(event) =>
                    updateParticipant(person.id, { name: event.target.value })
                  }
                />
              </label>
              <label>
                <span>출석 상태</span>
                <select
                  value={person.status}
                  onChange={(event) =>
                    updateParticipant(person.id, {
                      status: event.target.value as AttendanceStatus,
                    })
                  }
                >
                  {Object.entries(STATUS_LABELS).map(([value, text]) => (
                    <option key={value} value={value}>
                      {text}
                    </option>
                  ))}
                </select>
              </label>
              <label className="check-label">
                <input
                  type="checkbox"
                  checked={person.participates}
                  onChange={(event) =>
                    updateParticipant(person.id, {
                      participates: event.target.checked,
                    })
                  }
                />
                배정 포함
              </label>
              <span className={person.fixedSeat ? "badge fixed" : "badge"}>
                {person.fixedSeat ?? "랜덤"}
              </span>
            </article>
          ))}
        </div>

        <button type="button" className="button primary full" onClick={runAssignment}>
          자리 섞기
        </button>
        {error && <p className="error" role="alert">{error}</p>}
      </section>

      <section className="panel" aria-labelledby="result-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">STEP 02</p>
            <h2 id="result-title">배치 결과</h2>
          </div>
          <button
            type="button"
            className="button secondary"
            disabled={assignments.length === 0}
            onClick={() => downloadAssignments(assignments)}
          >
            PNG 저장
          </button>
        </div>

        {assignments.length === 0 ? (
          <p className="empty">출석을 확인한 뒤 자리 섞기를 실행하세요.</p>
        ) : (
          <div className="seat-grid" aria-live="polite">
            {assignments.map((item) => (
              <article className={item.fixed ? "seat fixed-seat" : "seat"} key={item.seat}>
                <span>{item.seat}</span>
                <strong>{item.name}</strong>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer>
        실제 현장 프로젝트의 포트폴리오용 익명 재구축판 · 원본 기술스택과 구분
      </footer>
    </main>
  )
}
