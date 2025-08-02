import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import BookingForm from '../../components/BookingForm'

describe('BookingForm', () => {
  const mockProps = {
    availableTimes: ['17:00', '18:00', '19:00'],
    dispatch: vi.fn(),
    submitForm: vi.fn(),
    bookedSlots: []
  }

  it('renders static text elements correctly', () => {
    render(<BookingForm {...mockProps} />)
    
    // Test for the main heading
    expect(screen.getByText('Reserve a Table')).toBeInTheDocument()
    
    // Test for form labels
    expect(screen.getByText('Choose date')).toBeInTheDocument()
    expect(screen.getByText('Choose time')).toBeInTheDocument()
    expect(screen.getByText('Number of guests')).toBeInTheDocument()
    expect(screen.getByText('Occasion')).toBeInTheDocument()
    
    // Test for submit button text
    expect(screen.getByText('Make Your Reservation')).toBeInTheDocument()
    
    // Test for select placeholder text
    expect(screen.getByText('Select a time')).toBeInTheDocument()
  })

  it('renders form inputs with correct attributes', () => {
    render(<BookingForm {...mockProps} />)
    
    // Test date input
    const dateInput = screen.getByLabelText('Choose date')
    expect(dateInput).toHaveAttribute('type', 'date')
    expect(dateInput).toHaveAttribute('required')
    
    // Test time select
    const timeSelect = screen.getByLabelText('Choose time')
    expect(timeSelect).toHaveAttribute('required')
    
    // Test guests input
    const guestsInput = screen.getByLabelText('Number of guests')
    expect(guestsInput).toHaveAttribute('type', 'number')
    expect(guestsInput).toHaveAttribute('min', '1')
    expect(guestsInput).toHaveAttribute('max', '10')
    expect(guestsInput).toHaveAttribute('required')
  })

  it('renders available time options', () => {
    render(<BookingForm {...mockProps} />)
    
    // Check that available times are rendered as options
    expect(screen.getByText('17:00')).toBeInTheDocument()
    expect(screen.getByText('18:00')).toBeInTheDocument()
    expect(screen.getByText('19:00')).toBeInTheDocument()
  })
})
