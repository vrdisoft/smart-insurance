import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { ColumnWithMeta } from './type'

type ColumnSidebarProps<TData> = {
  isOpen: boolean
  allColumns: ColumnWithMeta<TData>[]
  columnVisibility: Record<string, boolean>
  onChange: (columnId: string, visible: boolean) => void
  onClose: () => void
}

export const ColumnSidebar = <TData,>({
  allColumns,
  isOpen,
  columnVisibility,
  onChange,
  onClose,
}: ColumnSidebarProps<TData>) => {
  useEffect(() => {
    const tableContainer = document.getElementById('table-container')

    if (isOpen && tableContainer) {
      tableContainer.style.overflowX = 'hidden'
    } else if (tableContainer) {
      tableContainer.style.overflowX = ''
    }

    return () => {
      if (tableContainer) {
        tableContainer.style.overflowX = ''
      }
    }
  }, [isOpen])

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="absolute top-[85px] left-0 w-64 h-[calc(100%-150px)] bg-gradient-to-b to-neutral-50 from-white border-neutral-200 border shadow-xl z-50 p-4 rounded-r-2xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-neutral--700">تنظیمات ستون‌ها</h3>
          <i
            onClick={onClose}
            className="icon-reject text-body-icon-lg before:!font-bold text-neutral-600 hover:text-neutral-900 transition-colors duration-200 cursor-pointer"
          />
        </div>
        <div className="overflow-y-auto h-[calc(100%-40px)]">
          <ul className="space-y-3  ">
            {allColumns.map(col =>
              col.id ? (
                <li key={col.id} className="flex items-center gap-2 text-sm text-neutral-700">
                  <input
                    type="checkbox"
                    id={col.id}
                    checked={columnVisibility[col.id] !== false}
                    onChange={e => onChange(col.id!, e.target.checked)}
                    className="accent-primary-500-500 w-4 h-4 rounded-[8px]"
                  />
                  <label htmlFor={col.id}>
                    {typeof col.header === 'string' && col.header ? col.header : '(ستون بدون عنوان)'}
                  </label>
                </li>
              ) : null,
            )}
          </ul>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
