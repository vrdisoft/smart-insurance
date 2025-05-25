import React from 'react'
import { render } from '@testing-library/react'
import { HomePage } from './HomePage'
import '@testing-library/jest-dom'

jest.mock('next/link', () => ({ children, href }: any) => <a href={href}>{children}</a>)
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('HomePage', () => {
  it('renders header and insurance cards', () => {
    const { getByText } = render(<HomePage />)

    expect(getByText('Smart Insurance Portal')).toBeInTheDocument()
    expect(getByText('Explore Insurance Types')).toBeInTheDocument()
    expect(getByText('Health Insurance')).toBeInTheDocument()
    expect(getByText('Car Insurance')).toBeInTheDocument()
    expect(getByText('Home Insurance')).toBeInTheDocument()
    expect(getByText(/Provides coverage for medical expenses/)).toBeInTheDocument()
    expect(getByText(/Covers your vehicle against accidents/)).toBeInTheDocument()
    expect(getByText(/Protects your property and belongings/)).toBeInTheDocument()
  })

  it('renders links with correct href', () => {
    const { getByText } = render(<HomePage />)
    expect(getByText('Health Insurance').closest('a')).toHaveAttribute('href', '/insurance-form/health')
    expect(getByText('Car Insurance').closest('a')).toHaveAttribute('href', '/insurance-form/car')
    expect(getByText('Home Insurance').closest('a')).toHaveAttribute('href', '/insurance-form/home')
  })
})
