import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { initializeTimes, updateTimes } from '../timesReducer'
import { fetchAPI } from '../api'

// Mock the fetchAPI function
vi.mock('../api', () => ({
  fetchAPI: vi.fn()
}))

describe('timesReducer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('initializeTimes', () => {
    it('calls fetchAPI with current date and returns its result', () => {
      const mockTimes = ['17:00', '17:30', '18:00', '19:00', '20:00']
      fetchAPI.mockReturnValue(mockTimes)

      const result = initializeTimes()

      expect(fetchAPI).toHaveBeenCalledTimes(1)
      expect(fetchAPI).toHaveBeenCalledWith(expect.any(Date))
      expect(result).toEqual(mockTimes)
    })

    it('returns an array from fetchAPI', () => {
      const mockTimes = ['17:00', '18:00', '19:00']
      fetchAPI.mockReturnValue(mockTimes)

      const result = initializeTimes()

      expect(Array.isArray(result)).toBe(true)
      expect(result).toEqual(mockTimes)
    })

    it('handles empty array from fetchAPI', () => {
      fetchAPI.mockReturnValue([])

      const result = initializeTimes()

      expect(result).toEqual([])
      expect(Array.isArray(result)).toBe(true)
    })
  })

  describe('updateTimes', () => {
    it('calls fetchAPI with the selected date for UPDATE_TIMES action', () => {
      const mockTimes = ['17:00', '18:30', '20:00']
      fetchAPI.mockReturnValue(mockTimes)
      
      const initialState = ['17:00', '18:00', '19:00']
      const selectedDate = '2024-01-15'
      const action = { type: 'UPDATE_TIMES', payload: selectedDate }

      const result = updateTimes(initialState, action)

      expect(fetchAPI).toHaveBeenCalledTimes(1)
      expect(fetchAPI).toHaveBeenCalledWith(new Date(selectedDate))
      expect(result).toEqual(mockTimes)
    })

    it('returns different times for different dates', () => {
      const mockTimes1 = ['17:00', '18:00']
      const mockTimes2 = ['19:00', '20:00', '21:00']
      
      const initialState = ['17:00']
      
      // First call with one date
      fetchAPI.mockReturnValueOnce(mockTimes1)
      const action1 = { type: 'UPDATE_TIMES', payload: '2024-01-15' }
      const result1 = updateTimes(initialState, action1)
      
      // Second call with different date
      fetchAPI.mockReturnValueOnce(mockTimes2)
      const action2 = { type: 'UPDATE_TIMES', payload: '2024-01-16' }
      const result2 = updateTimes(initialState, action2)

      expect(result1).toEqual(mockTimes1)
      expect(result2).toEqual(mockTimes2)
      expect(fetchAPI).toHaveBeenCalledTimes(2)
      expect(fetchAPI).toHaveBeenNthCalledWith(1, new Date('2024-01-15'))
      expect(fetchAPI).toHaveBeenNthCalledWith(2, new Date('2024-01-16'))
    })

    it('returns the same state for unknown action types', () => {
      const initialState = ['17:00', '18:00', '19:00']
      const action = { type: 'UNKNOWN_ACTION' }

      const result = updateTimes(initialState, action)

      expect(result).toEqual(initialState)
      expect(fetchAPI).not.toHaveBeenCalled()
    })

    it('returns the same state when action is null or undefined', () => {
      const initialState = ['17:00', '18:00']

      const resultWithNull = updateTimes(initialState, null)
      const resultWithUndefined = updateTimes(initialState, undefined)

      expect(resultWithNull).toEqual(initialState)
      expect(resultWithUndefined).toEqual(initialState)
      expect(fetchAPI).not.toHaveBeenCalled()
    })

    it('handles invalid date strings in payload', () => {
      const mockTimes = ['17:00', '18:00']
      fetchAPI.mockReturnValue(mockTimes)
      
      const initialState = ['19:00']
      const action = { type: 'UPDATE_TIMES', payload: 'invalid-date' }

      const result = updateTimes(initialState, action)

      expect(fetchAPI).toHaveBeenCalledWith(new Date('invalid-date'))
      expect(result).toEqual(mockTimes)
    })

    it('handles missing payload', () => {
      const mockTimes = ['17:00']
      fetchAPI.mockReturnValue(mockTimes)
      
      const initialState = ['19:00']
      const action = { type: 'UPDATE_TIMES' }

      const result = updateTimes(initialState, action)

      expect(fetchAPI).toHaveBeenCalledWith(new Date(undefined))
      expect(result).toEqual(mockTimes)
    })
  })
})