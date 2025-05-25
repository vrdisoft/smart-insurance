'use client'
import { useEffect, useState } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import { data } from './data'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Header = () => {
  const [isDark, setIsDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const path = usePathname()
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    document.documentElement.classList.toggle('dark', newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md w-full fixed z-40">
        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">Smart Insurance</div>
        <div className="hidden md:flex space-x-6">
          {data.map(item => (
            <Link
              key={item.name}
              href={item.url}
              className={`text-gray-700 font-bold dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 pb-1 ${
                path === item.url ? 'border-b-2 border-blue-600 dark:border-blue-400' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <DarkModeSwitch checked={isDark} onChange={toggleDarkMode} sunColor="rgb(255, 168, 46)" size={28} />
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-700 dark:text-gray-200">
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden p-4 space-y-4 bg-white dark:bg-gray-800 shadow-md fixed top-16 w-full z-30">
          {data.map(item => (
            <Link
              key={item.name}
              href={item.url}
              className={`block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 pb-1 `}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </>
  )
}
