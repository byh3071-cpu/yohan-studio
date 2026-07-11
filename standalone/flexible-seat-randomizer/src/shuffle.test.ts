import { describe, expect, it } from "vitest"
import { assignSeats, shuffle, type Participant } from "./shuffle"

const people: Participant[] = [
  { id: "fixed-a", name: "고정 A", status: "present", participates: true, fixedSeat: "고정 A" },
  { id: "fixed-b", name: "고정 B", status: "present", participates: true, fixedSeat: "고정 B" },
  { id: "p1", name: "참여자 01", status: "present", participates: true },
  { id: "p2", name: "참여자 02", status: "late", participates: true },
  { id: "p3", name: "참여자 03", status: "sick", participates: false },
]

const firstIndex = () => 0

describe("shuffle", () => {
  it("원소를 잃거나 중복하지 않는다", () => {
    const input = Array.from({ length: 13 }, (_, index) => index + 1)
    const output = shuffle(input, firstIndex)
    expect([...output].sort((a, b) => a - b)).toEqual(input)
  })
})

describe("assignSeats", () => {
  it("고정 좌석을 유지하고 참여하지 않는 사람을 제외한다", () => {
    const result = assignSeats(people, ["자리 01", "자리 02"], firstIndex)
    expect(result).toHaveLength(4)
    expect(result).toContainEqual({
      participantId: "fixed-a",
      name: "고정 A",
      seat: "고정 A",
      fixed: true,
    })
    expect(result.some((item) => item.participantId === "p3")).toBe(false)
  })

  it("한 사람과 한 좌석을 중복 배정하지 않는다", () => {
    const result = assignSeats(people, ["자리 01", "자리 02"], firstIndex)
    expect(new Set(result.map((item) => item.participantId)).size).toBe(result.length)
    expect(new Set(result.map((item) => item.seat)).size).toBe(result.length)
  })

  it("가용 좌석보다 참여자가 많으면 완료를 거부한다", () => {
    expect(() => assignSeats(people, ["자리 01"], firstIndex)).toThrow(
      "가용 좌석 1개보다 많습니다",
    )
  })
})
