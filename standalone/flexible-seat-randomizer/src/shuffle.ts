export type AttendanceStatus =
  | "present"
  | "late"
  | "sick"
  | "leave"
  | "half-day"
  | "other"

export type Participant = {
  id: string
  name: string
  status: AttendanceStatus
  participates: boolean
  fixedSeat?: string
}

export type Assignment = {
  participantId: string
  name: string
  seat: string
  fixed: boolean
}

export type RandomInt = (maxExclusive: number) => number

export function secureRandomInt(maxExclusive: number): number {
  if (!Number.isSafeInteger(maxExclusive) || maxExclusive <= 0) {
    throw new RangeError("maxExclusive must be a positive safe integer")
  }

  const range = 0x1_0000_0000
  const limit = range - (range % maxExclusive)
  const buffer = new Uint32Array(1)

  do {
    crypto.getRandomValues(buffer)
  } while (buffer[0] >= limit)

  return buffer[0] % maxExclusive
}

export function shuffle<T>(items: readonly T[], randomInt: RandomInt): T[] {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(index + 1)
    ;[result[index], result[swapIndex]] = [result[swapIndex], result[index]]
  }
  return result
}

export function assignSeats(
  participants: readonly Participant[],
  randomSeats: readonly string[],
  randomInt: RandomInt = secureRandomInt,
): Assignment[] {
  const active = participants.filter((person) => person.participates)
  const fixed = active.filter((person) => person.fixedSeat)
  const random = active.filter((person) => !person.fixedSeat)

  if (random.length > randomSeats.length) {
    throw new Error(
      `배정할 인원 ${random.length}명이 가용 좌석 ${randomSeats.length}개보다 많습니다.`,
    )
  }

  const duplicateFixedSeat = fixed.find(
    (person, index) =>
      fixed.findIndex((candidate) => candidate.fixedSeat === person.fixedSeat) !== index,
  )
  if (duplicateFixedSeat) {
    throw new Error(`고정 좌석 ${duplicateFixedSeat.fixedSeat}이 중복되었습니다.`)
  }

  const seats = shuffle(randomSeats, randomInt)
  return [
    ...fixed.map((person) => ({
      participantId: person.id,
      name: person.name,
      seat: person.fixedSeat!,
      fixed: true,
    })),
    ...random.map((person, index) => ({
      participantId: person.id,
      name: person.name,
      seat: seats[index],
      fixed: false,
    })),
  ].sort((a, b) => a.seat.localeCompare(b.seat, "ko", { numeric: true }))
}
