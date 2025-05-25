'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '../../lib/utils'

export type Option = {
  label: string
  value: string
}

export type SelectProps = {
  options: Option[]
  value?: string
  onChange: (value: string | number) => void
  onSearch?: (searchTerm: string) => void | Promise<void>
  placeholder?: string
  className?: string
  onBlur?: (event: React.FocusEvent<HTMLButtonElement, Element>) => void
  labelRequired?: boolean
  label?: string
  labelClass?: string
  labelFont?: string
  inRow?: boolean
  error?: string
}

export const Select: React.FC<SelectProps> = ({
  options,
  value = '',
  onChange,
  onSearch,
  placeholder = 'Select an option',
  className = '',
  onBlur,
  labelRequired,
  label,
  labelClass,
  labelFont,
  inRow,
  error,
}) => {
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selected = options.find(opt => opt.value === value)

  const filteredOptions = useMemo(() => {
    if (onSearch) return options
    return options.filter(opt => opt.label.toLowerCase().includes(search.toLowerCase()))
  }, [search, options, onSearch])

  useEffect(() => {
    if (onSearch) {
      setLoading(true)
      const delay = setTimeout(async () => {
        await onSearch(search)
        setLoading(false)
      }, 500)
      return () => clearTimeout(delay)
    }
  }, [search])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      className={`w-full h-full flex gap-2 ${inRow ? 'flex-col lg:flex-row lg:items-center' : 'flex-col justify-center md:gap-4'}
        `}
    >
      {label && (
        <div className={cn(`${labelFont} w-fit ${labelClass} `)}>
          {label}
          {labelRequired && <span className="text-red-500 pr-[2px]">*</span>}
        </div>
      )}
      <div ref={dropdownRef} className={`relative w-full  ${className}`}>
        <button
          type="button"
          onClick={() => setIsOpen(prev => !prev)}
          className={cn(
            `w-full h-12 flex justify-between items-center  border border-gray-200 rounded-lg shadow-sm px-4 py-2 text-sm  focus:outline-none focus:ring-2 focus:ring-gray-300  ${error ? 'border border-red-500' : ''}`,
          )}
          onBlur={onBlur}
        >
          <span>{selected?.label || <span className="text-gray-400">{placeholder}</span>}</span>
          {isOpen ? <i className="icon-arrow-down rotate-180 " /> : <i className="icon-arrow-down " />}
        </button>

        {isOpen && (
          <div className="absolute mt-1 w-full rounded-lg shadow-lg bg-white dark:bg-gray-700 border border-gray-200 z-50">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-2 border-b border-gray-200 text-sm focus:outline-none rounded-t-lg"
              />
              {loading && (
                <div className="absolute top-2 right-3 text-gray-400 animate-spin">{/* <Loader2 size={16} /> */}</div>
              )}
            </div>
            <ul className="max-h-52 overflow-y-auto">
              {loading && <li className="px-4 py-2 text-sm text-gray-400">Loading...</li>}

              {!loading && filteredOptions.length === 0 && (
                <li className="px-4 py-2 text-gray-400 text-sm">No results found</li>
              )}

              {!loading &&
                filteredOptions.length > 0 &&
                filteredOptions.map(opt => (
                  <li
                    key={opt.value}
                    className="px-4 py-2 hover:bg-blue-50 text-sm text-left text-gray-700 dark:text-white dark:hover:text-gray-700 cursor-pointer"
                    onClick={() => {
                      onChange(opt.value)
                      setIsOpen(false)
                      setSearch('')
                    }}
                  >
                    {opt.label}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      {error && (
        <div className={`md:absolute block h-4 text-red-500 mt-0 md:mt-28 mr-2 text-body-xxs`}>
          {error ? error : ''}
        </div>
      )}
    </div>
  )
}
