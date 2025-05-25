import React from 'react'
import { render } from '@testing-library/react'
import { FieldGroup } from './FieldGroup'
import '@testing-library/jest-dom'

const mockGroup = {
  label: 'Test Group',
  fields: [
    {
      id: 'field1',
      type: 'text',
      label: 'Field 1',
    },
    {
      id: 'field2',
      type: 'text',
      label: 'Field 2',
    },
  ],
}

jest.mock('./FormField', () => ({
  FormField: ({ field }: any) => <div data-testid={`form-field-${field.id}`}>{field.label}</div>,
}))

describe('FieldGroup', () => {
  it('renders group label and fields', () => {
    const { getByText, getByTestId } = render(
      <FieldGroup group={mockGroup as any} control={{}} allValues={{}} errors={{}} groupId="testGroup" />,
    )

    expect(getByText('Test Group')).toBeInTheDocument()
    expect(getByTestId('form-field-field1')).toHaveTextContent('Field 1')
    expect(getByTestId('form-field-field2')).toHaveTextContent('Field 2')
  })
})
