import { describe, it, expect } from '@jest/globals'
import dateToMinutes from '../../../src/infrastructure/utils/date.utils'

describe('dateToMinutes', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
    jest.useRealTimers()
  })

  it('should calculate minutes between entrance and exit dates', () => {
    const entrance = new Date('2023-10-10T08:00:00Z')
    const exit = new Date('2023-10-10T10:30:00Z')
    const result = dateToMinutes(entrance, exit)
    expect(result).toBe('150 minutes') // 2 hours 30 minutes = 150 minutes
  })

  it('should calculate minutes between entrance and now when exit is undefined', () => {
    const entrance = new Date(Date.now() - 60 * 60 * 1000) // 1 hour ago

    const now = new Date()
    jest.useFakeTimers().setSystemTime(now)

    const result = dateToMinutes(entrance)
    expect(result).toBe('60 minutes')
  })

  it('should return 0 minutes when entrance and exit are the same', () => {
    const entrance = new Date()
    const exit = new Date(entrance.getTime())
    const result = dateToMinutes(entrance, exit)
    expect(result).toBe('0 minutes')
  })

  it('should handle negative time differences correctly', () => {
    const entrance = new Date('2023-10-10T10:00:00Z')
    const exit = new Date('2023-10-10T08:00:00Z') // earlier than entrance
    const result = dateToMinutes(entrance, exit)
    expect(result).toBe('120 minutes') // absolute difference
  })

  it('should calculate minutes when exit is null (use current time)', () => {
    const entrance = new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago

    const now = new Date()
    jest.useFakeTimers().setSystemTime(now)

    const result = dateToMinutes(entrance)
    expect(result).toBe('30 minutes')
  })
})
