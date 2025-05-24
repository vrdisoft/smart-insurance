'use client'
import React from 'react'
import { Select } from '../Select'
import { Input } from '../Input'
import { DatePicker } from '../DatePicker'
import { Switch } from '../Switch'

type CellRendererProps = {
  value: any
  type?: string
  editable?: boolean
  editJustInAdd?: boolean
  isAddRow?: boolean
  onChange?: (value: unknown) => void
  options?: { label: string; value: string }[]
}

export const CellRenderer: React.FC<CellRendererProps> = ({
  value,
  type,
  editable,

  editJustInAdd,
  isAddRow,
  onChange,
  options = [],
}) => {
  if (editable && (isAddRow || (!isAddRow && !editJustInAdd))) {
    switch (type) {
      case 'select':
        return (
          <Select
            options={options}
            value={value}
            onChange={val => {
              onChange?.(val)
            }}
          />
        )
      case 'date':
        return <DatePicker onChange={val => onChange?.(val)} />
      case 'boolean':
        return (
          <div>
            <Switch value={value} onChange={val => onChange?.(val)} />
          </div>
        )
      default:
        return <Input value={value} onChange={e => onChange?.(e.target.value)} />
    }
    //}
  }

  switch (type) {
    case 'url':
      return (
        <a href={value} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
          {value}
        </a>
      )
    case 'email':
      return (
        <a href={`mailto:${value}`} className="text-blue-600 underline">
          {value}
        </a>
      )
    case 'select':
      return <span>{options.find(o => o.value === value)?.label ?? value}</span>
    case 'date':
      return value ? <span>{value}</span> : '--'
    case 'dateTime':
      return value ? <span>{value}</span> : '--'
    case 'currency':
      return <span>{Number(value).toLocaleString()}</span>
    case 'image':
      return <img src={value} alt="Image" className="w-16 h-16 object-cover" />
    case 'boolean':
      return (
        <div>
          <Switch value={value} onChange={() => {}} disabled />
        </div>
      )

    default:
      return <span>{value}</span>
  }
}
