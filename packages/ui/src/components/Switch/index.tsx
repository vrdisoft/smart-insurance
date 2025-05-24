'use client'
import { useEffect, useState } from 'react'

interface SwitchPropsType {
  onChange: (value: boolean) => void
  value: boolean
  disabled?: boolean
}
export const Switch = ({ onChange, value, disabled }: SwitchPropsType) => {
  const [selected, setSelected] = useState<boolean>(false)

  useEffect(() => {
    setSelected(value)
  }, [value])

  const handleSelect = () => {
    setSelected(prev => !prev)
    onChange(!selected)
  }

  return (
    <label form="switch" className="relative inline-flex items-center cursor-pointer">
      <input
        id="switch"
        aria-label="switch"
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={selected}
        onChange={handleSelect}
        disabled={disabled}
      />
      <div className="w-8 h-3 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#add4ff] peer-checked:after:bg-primary-500 peer-checked:after:border-none after:content-[''] after:absolute after:-top-1 after:-left-1 after:bg-neutral-500 after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
    </label>
  )
}
