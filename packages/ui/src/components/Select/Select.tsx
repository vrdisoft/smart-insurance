'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'

type Option = {
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
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  onSearch,
  placeholder = 'انتخاب کنید',
  className = '',
  onBlur,
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
    <div ref={dropdownRef} className={`relative w-full  ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full h-12 flex justify-between items-center bg-white border border-neutral-200 rounded-lg shadow-sm px-4 py-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
        onBlur={onBlur}
      >
        <span>{selected?.label || <span className="text-neutral-400">{placeholder}</span>}</span>
        {isOpen ? <i className="icon-arrow-down rotate-180" /> : <i className="icon-arrow-down " />}
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-full rounded-lg shadow-lg bg-white border border-neutral-200 z-50">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="جستجو ..."
              className="w-full px-3 py-2 border-b border-neutral-200 text-sm focus:outline-none rounded-t-lg"
            />
            {loading && (
              <div className="absolute top-2 right-3 text-neutral-400 animate-spin">{/* <Loader2 size={16} /> */}</div>
            )}
          </div>
          <ul className="max-h-52 overflow-y-auto">
            {loading && <li className="px-4 py-2 text-sm text-neutral-400">درحال بارگذاری...</li>}

            {!loading && filteredOptions.length === 0 && (
              <li className="px-4 py-2 text-neutral-400 text-sm">چیزی یافت نشد</li>
            )}

            {!loading &&
              filteredOptions.length > 0 &&
              filteredOptions.map(opt => (
                <li
                  key={opt.value}
                  className="px-4 py-2 hover:bg-primary-50 text-sm text-right text-neutral-700 cursor-pointer"
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
  )
}
