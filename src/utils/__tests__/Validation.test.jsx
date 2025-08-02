import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookingForm from '../BookingForm'

// Mock the BookingSlotsList component
vi.mock('../BookingSlotsList', () => ({
  default: ({ selectedDate, availableTimes, bookedSlots, selectedTime, onTimeSelect }) => (
    <div data-testid="booking-slots-list">
      <span data-testid="selected-date">{selectedDate}</span>
      <span data-testid="available-times">{availableTimes.join(',')}</span>
      <span data-testid="selected-time">{selectedTime}</span>
    </div>
  )
}))

describe('BookingForm', () => {
  const mockProps = {
    availableTimes: ['17:00', '17:30', '18:00', '18:30', '19:00'],
    dispatch: vi.fn(),
    submitForm: vi.fn(),
    bookedSlots: []
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // Mock current date for consistent testing
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-15'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('HTML5 Validation Attributes', () => {
    it('applies correct attributes to date input field', () => {
      render(<BookingForm {...mockProps} />)
      
      const dateInput = screen.getByLabelText(/choose date/i)
      
      expect(dateInput).toHaveAttribute('type', 'date')
      expect(dateInput).toHaveAttribute('id', 'res-date')
      expect(dateInput).toHaveAttribute('name', 'res-date')
      expect(dateInput).toHaveAttribute('required')
      expect(dateInput).toHaveAttribute('min', '2024-01-15') // Today's date
      expect(dateInput).toHaveClass('form-input')
    })

    it('applies correct attributes to time select field', () => {
      render(<BookingForm {...mockProps} />)
      
      const timeSelect = screen.getByLabelText(/choose time/i)
      
      expect(timeSelect).toHaveAttribute('id', 'res-time')
      expect(timeSelect).toHaveAttribute('name', 'res-time')
      expect(timeSelect).toHaveAttribute('required')
      expect(timeSelect).toHaveClass('form-select')
    })

    it('applies correct attributes to guests input field', () => {
      render(<BookingForm {...mockProps} />)
      
      const guestsInput = screen.getByLabelText(/number of guests/i)
      
      expect(guestsInput).toHaveAttribute('type', 'number')
      expect(guestsInput).toHaveAttribute('id', 'guests')
      expect(guestsInput).toHaveAttribute('name', 'guests')
      expect(guestsInput).toHaveAttribute('min', '1')
      expect(guestsInput).toHaveAttribute('max', '10')
      expect(guestsInput).toHaveAttribute('placeholder', '1')
      expect(guestsInput).toHaveAttribute('required')
      expect(guestsInput).toHaveClass('form-input')
    })

    it('applies correct attributes to occasion select field', () => {
      render(<BookingForm {...mockProps} />)
      
      const occasionSelect = screen.getByLabelText(/occasion/i)
      
      expect(occasionSelect).toHaveAttribute('id', 'occasion')
      expect(occasionSelect).toHaveAttribute('name', 'occasion')
      expect(occasionSelect).toHaveClass('form-select')
      // Note: occasion field is not required as it has a default value
      expect(occasionSelect).not.toHaveAttribute('required')
    })

    it('submit button has correct attributes', () => {
      render(<BookingForm {...mockProps} />)
      
      const submitButton = screen.getByRole('button', { name: /make your reservation/i })
      
      expect(submitButton).toHaveAttribute('type', 'submit')
      expect(submitButton).toHaveClass('submit-button')
    })
  })

  describe('Form Validation - Valid States', () => {
    it('accepts valid date input (future date)', async () => {
      const user = userEvent.setup()
      render(<BookingForm {...mockProps} />)
      
      const dateInput = screen.getByLabelText(/choose date/i)
      
      await user.type(dateInput, '2024-01-20')
      
      expect(dateInput.value).toBe('2024-01-20')
      expect(dateInput.validity.valid).toBe(true)
    })

    it('accepts valid time selection from available times', async () => {
      const user = userEvent.setup()
      render(<BookingForm {...mockProps} />)
      
      const timeSelect = screen.getByLabelText(/choose time/i)
      
      await user.selectOptions(timeSelect, '18:00')
      
      expect(timeSelect.value).toBe('18:00')
      expect(timeSelect.validity.valid).toBe(true)
    })

    it('accepts valid number of guests (1-10)', async () => {
      const user = userEvent.setup()
      render(<BookingForm {...mockProps} />)
      
      const guestsInput = screen.getByLabelText(/number of guests/i)
      
      await user.clear(guestsInput)
      await user.type(guestsInput, '1')
      expect(guestsInput.value).toBe('1')
      expect(guestsInput.validity.valid).toBe(true)
      
      await user.clear(guestsInput)
      await user.type(guestsInput, '10')
      expect(guestsInput.value).toBe('10')
      expect(guestsInput.validity.valid).toBe(true)
      
      await user.clear(guestsInput)
      await user.type(guestsInput, '5')
      expect(guestsInput.value).toBe('5')
      expect(guestsInput.validity.valid).toBe(true)
    })

    it('accepts valid occasion selections', async () => {
      const user = userEvent.setup()
      render(<BookingForm {...mockProps} />)
      
      const occasionSelect = screen.getByLabelText(/occasion/i)
      
      await user.selectOptions(occasionSelect, 'Birthday')
      expect(occasionSelect.value).toBe('Birthday')
      expect(occasionSelect.validity.valid).toBe(true)
      
      await user.selectOptions(occasionSelect, 'Anniversary')
      expect(occasionSelect.value).toBe('Anniversary')
      expect(occasionSelect.validity.valid).toBe(true)
    })
  })

  describe('Form Validation - Invalid States', () => {
    it('rejects empty date input', async () => {
      render(<BookingForm {...mockProps} />)
      
      const dateInput = screen.getByLabelText(/choose date/i)
      const submitButton = screen.getByRole('button', { name: /make your reservation/i })
      
      fireEvent.click(submitButton)
      
      expect(dateInput.validity.valid).toBe(false)
      expect(dateInput.validity.valueMissing).toBe(true)
    })

    it('rejects past dates', async () => {
      const user = userEvent.setup()
      render(<BookingForm {...mockProps} />)
      
      const dateInput = screen.getByLabelText(/choose date/i)

      await user.type(dateInput, '2024-01-10')
      
      expect(dateInput.validity.valid).toBe(false)
      expect(dateInput.validity.rangeUnderflow).toBe(true)
    })

    it('rejects empty time selection', async () => {
      render(<BookingForm {...mockProps} />)
      
      const timeSelect = screen.getByLabelText(/choose time/i)
      const submitButton = screen.getByRole('button', { name: /make your reservation/i })
      
      fireEvent.click(submitButton)
      
      expect(timeSelect.validity.valid).toBe(false)
      expect(timeSelect.validity.valueMissing).toBe(true)
    })

    it('rejects invalid number of guests (below minimum)', async () => {
      const user = userEvent.setup()
      render(<BookingForm {...mockProps} />)
      
      const guestsInput = screen.getByLabelText(/number of guests/i)
      
      await user.clear(guestsInput)
      await user.type(guestsInput, '0')
      
      expect(guestsInput.validity.valid).toBe(false)
      expect(guestsInput.validity.rangeUnderflow).toBe(true)
    })

    it('rejects invalid number of guests (above maximum)', async () => {
      const user = userEvent.setup()
      render(<BookingForm {...mockProps} />)
      
      const guestsInput = screen.getByLabelText(/number of guests/i)
      
      await user.clear(guestsInput)
      await user.type(guestsInput, '11')
      
      expect(guestsInput.validity.valid).toBe(false)
      expect(guestsInput.validity.rangeOverflow).toBe(true)
    })

    it('rejects empty guests input', async () => {
      const user = userEvent.setup()
      render(<BookingForm {...mockProps} />)
      
      const guestsInput = screen.getByLabelText(/number of guests/i)
      const submitButton = screen.getByRole('button', { name: /make your reservation/i })
      
      await user.clear(guestsInput)
      
      fireEvent.click(submitButton)
      
      expect(guestsInput.validity.valid).toBe(false)
      expect(guestsInput.validity.valueMissing).toBe(true)
    })
  })

  describe('JavaScript Validation Functions', () => {
    it('dispatches UPDATE_TIMES action when date changes - valid case', async () => {
      const user = userEvent.setup()
      render(<BookingForm {...mockProps} />)
      
      const dateInput = screen.getByLabelText(/choose date/i)
      
      await user.type(dateInput, '2024-01-20')
      
      expect(mockProps.dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_TIMES',
        payload: '2024-01-20'
      })
    })

    it('handles date change with empty value - edge case', async () => {
      const user = userEvent.setup()
      render(<BookingForm {...mockProps} />)
      
      const dateInput = screen.getByLabelText(/choose date/i)
      
      // First set a date, then clear it
      await user.type(dateInput, '2024-01-20')
      await user.clear(dateInput)
      
      expect(mockProps.dispatch).toHaveBeenLastCalledWith({
        type: 'UPDATE_TIMES',
        payload: ''
      })
    })

    it('calls submitForm with correct data - valid submission', async () => {
      const user = userEvent.setup()
      mockProps.submitForm.mockReturnValue(true)
      
      render(<BookingForm {...mockProps} />)
      
      await user.type(screen.getByLabelText(/choose date/i), '2024-01-20')
      await user.selectOptions(screen.getByLabelText(/choose time/i), '18:00')
      await user.clear(screen.getByLabelText(/number of guests/i))
      await user.type(screen.getByLabelText(/number of guests/i), '4')
      await user.selectOptions(screen.getByLabelText(/occasion/i), 'Anniversary')
      
      await user.click(screen.getByRole('button', { name: /make your reservation/i }))
      
      expect(mockProps.submitForm).toHaveBeenCalledWith({
        date: '2024-01-20',
        time: '18:00',
        guests: 4,
        occasion: 'Anniversary'
      })
    })

    it('handles successful form submission - resets form and shows success message', async () => {
      const user = userEvent.setup()
      mockProps.submitForm.mockReturnValue(true)
      
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
      
      render(<BookingForm {...mockProps} />)
      
      await user.type(screen.getByLabelText(/choose date/i), '2024-01-20')
      await user.selectOptions(screen.getByLabelText(/choose time/i), '18:00')
      await user.clear(screen.getByLabelText(/number of guests/i))
      await user.type(screen.getByLabelText(/number of guests/i), '4')
      await user.selectOptions(screen.getByLabelText(/occasion/i), 'Anniversary')
      
      await user.click(screen.getByRole('button', { name: /make your reservation/i }))
      
      expect(screen.getByLabelText(/choose date/i).value).toBe('')
      expect(screen.getByLabelText(/choose time/i).value).toBe('')
      expect(screen.getByLabelText(/number of guests/i).value).toBe('1')
      expect(screen.getByLabelText(/occasion/i).value).toBe('Birthday')
      
      expect(alertSpy).toHaveBeenCalledWith('Reservation submitted successfully!')
      
      alertSpy.mockRestore()
    })

    it('handles failed form submission - shows error message and keeps form data', async () => {
      const user = userEvent.setup()
      mockProps.submitForm.mockReturnValue(false)
      
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
      
      render(<BookingForm {...mockProps} />)
      
      await user.type(screen.getByLabelText(/choose date/i), '2024-01-20')
      await user.selectOptions(screen.getByLabelText(/choose time/i), '18:00')
      
      await user.click(screen.getByRole('button', { name: /make your reservation/i }))
      
      expect(screen.getByLabelText(/choose date/i).value).toBe('2025-01-20')
      expect(screen.getByLabelText(/choose time/i).value).toBe('18:00')
      
      expect(alertSpy).toHaveBeenCalledWith('Failed to submit reservation. Please try again.')
      
      alertSpy.mockRestore()
    })

    it('handles time selection via BookingSlotsList component', async () => {
      render(<BookingForm {...mockProps} />)
      
      const bookingSlotsList = screen.getByTestId('booking-slots-list')
      expect(bookingSlotsList).toBeInTheDocument()
      
      expect(screen.getByTestId('available-times')).toHaveTextContent('17:00,17:30,18:00,18:30,19:00')
    })
  })

  describe('Edge Cases and Error Handling', () => {
    it('handles form submission with invalid form elements', async () => {
      const user = userEvent.setup()
      render(<BookingForm {...mockProps} />)
      
      // Try to submit form with invalid data
      await user.type(screen.getByLabelText(/choose date/i), '2024-01-10') // Past date
      
      const submitButton = screen.getByRole('button', { name: /make your reservation/i })
      await user.click(submitButton)
      
      // submitForm should not be called with invalid form
      expect(mockProps.submitForm).not.toHaveBeenCalled()
    })

    it('handles non-numeric input in guests field', async () => {
      const user = userEvent.setup()
      render(<BookingForm {...mockProps} />)
      
      const guestsInput = screen.getByLabelText(/number of guests/i)
      
      // Try to type non-numeric characters (should be prevented by input type="number")
      await user.clear(guestsInput)
      await user.type(guestsInput, 'abc')
      
      // Input should remain empty or unchanged
      expect(guestsInput.value).toBe('')
    })
  })
})