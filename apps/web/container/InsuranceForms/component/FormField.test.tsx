import React from 'react'
import { render } from '@testing-library/react'
import { FormField } from './FormField'
import '@testing-library/jest-dom'

jest.mock('@repo/ui', () => ({
  InputController: (props: any) => <div data-testid="input">{props.label}</div>,
  SelectController: (props: any) => <div data-testid="select">{props.label}</div>,
  RadioGroupController: (props: any) => <div data-testid="radio">{props.label}</div>,
  CheckboxListController: (props: any) => <div data-testid="checkbox">{props.label}</div>,
  DatePickerController: (props: any) => <div data-testid="date">{props.label}</div>,
}))

const baseField = {
  id: 'test',
  label: 'Test Label',
  required: true,
  type: 'text',
}

describe('FormField', () => {
  it('renders InputController for text type', () => {
    const { getByTestId } = render(<FormField field={{ ...baseField, type: 'text' }} control={{}} allValues={{}} />)
    expect(getByTestId('input')).toHaveTextContent('Test Label')
  })

  it('renders SelectController for select type', () => {
    const { getByTestId } = render(
      <FormField field={{ ...baseField, type: 'select', options: ['a', 'b'] }} control={{}} allValues={{}} />,
    )
    expect(getByTestId('select')).toHaveTextContent('Test Label')
  })

  it('renders RadioGroupController for radio type', () => {
    const { getByTestId } = render(
      <FormField field={{ ...baseField, type: 'radio', options: ['a', 'b'] }} control={{}} allValues={{}} />,
    )
    expect(getByTestId('radio')).toHaveTextContent('Test Label')
  })

  it('renders CheckboxListController for checkbox type', () => {
    const { getByTestId } = render(
      <FormField field={{ ...baseField, type: 'checkbox', options: ['a', 'b'] }} control={{}} allValues={{}} />,
    )
    expect(getByTestId('checkbox')).toHaveTextContent('Test Label')
  })

  it('renders DatePickerController for date type', () => {
    const { getByTestId } = render(<FormField field={{ ...baseField, type: 'date' }} control={{}} allValues={{}} />)
    expect(getByTestId('date')).toHaveTextContent('Test Label')
  })

  it('renders nothing if not visible', () => {
    const field = {
      ...baseField,
      visibility: { dependsOn: 'other', value: 'x', condition: 'equals' },
    }
    const { container } = render(<FormField field={field} control={{}} allValues={{ other: 'y' }} />)
    expect(container.firstChild).toBeNull()
  })
})
