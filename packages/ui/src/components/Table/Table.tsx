import './table.scss'

import { Dropdown } from '../Dropdown'
import { cn } from '../../lib/utils'
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  RowData,
  SortingState,
  Table as TanstackTable,
  useReactTable,
} from '@tanstack/react-table'
import React, { forwardRef, Fragment, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'

import { useIsBigScreen } from './hooks/useIsBigScreen'
import { Pagination } from '../Pagination'
import { CellRenderer } from './CellRenderer'
import { ColumnSidebar } from './ColumnSidebar'
import { ColumnWithMeta, ServerTableRef, TableProps } from './type'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
    updateSubData: (rowIndex: number, subIndex: number, columnId: string, value: unknown, subRowsName: string) => void
  }
}

const useSkipper = () => {
  const shouldSkipRef = React.useRef(true)
  const shouldSkip = shouldSkipRef.current

  const skip = React.useCallback(() => {
    shouldSkipRef.current = false
  }, [])

  React.useEffect(() => {
    shouldSkipRef.current = true
  })

  return [shouldSkip, skip] as const
}

const Table = forwardRef(function <TData>(
  {
    columns,
    data,
    rowCount,
    loadData,
    pageSizeOptions = [10, 20, 50],
    enableSelection,
    tableId,
    className,
    fixHeight = true,
    actionBar,
    getRowCanExpand,
    renderSubComponent,
    expandAll,
    emptyRow,
    onEditRow,
    onCancelEdit,
  }: TableProps<TData>,
  ref: React.Ref<ServerTableRef<TData>>,
) {
  const COLUMN_VISIBILITY_KEY = `column-visibility-${tableId}`
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(pageSizeOptions?.[0] ?? 10)
  const [rowSelection, setRowSelection] = useState({})
  const [rowEditIds, setRowEditIds] = useState<string[]>([])
  const [addRowId, setAddRowId] = useState('')
  const [showColumnSidebar, setShowColumnSidebar] = useState(false)
  const isBigScreen = useIsBigScreen()
  const [tableHeight, setTableHeight] = useState('')
  const visibleColumns = columns.filter(col => col.visible !== false)
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()
  const [tempData, setTempData] = useState<TData[]>([])

  useEffect(() => {
    setTempData([...data])
  }, [data])

  const table = useReactTable({
    data: tempData,
    columns: enableSelection
      ? [
          {
            id: '__select__',
            size: 40,
            header: ({ table }) => (
              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={table.getIsAllPageRowsSelected()}
                  onChange={table.getToggleAllPageRowsSelectedHandler()}
                  className="w-4 h-4"
                />
              </div>
            ),
            cell: ({ row }) => (
              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={row.getIsSelected()}
                  onChange={row.getToggleSelectedHandler()}
                  onClick={e => e.stopPropagation()}
                />
              </div>
            ),
          },
          ...visibleColumns,
        ]
      : visibleColumns,
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageIndex,
        pageSize,
      },
      rowSelection,
    },
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    enableRowSelection: enableSelection,
    pageCount: Math.ceil(rowCount / pageSize),
    autoResetPageIndex,
    getRowCanExpand,
    onPaginationChange: updater => {
      const next = typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater
      setPageIndex(next.pageIndex)
      setPageSize(next.pageSize)
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    getExpandedRowModel: getExpandedRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex()
        setTempData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              }
            }
            return row
          }),
        )
        if (!rowEditIds.some(item => item === rowIndex.toString())) {
          setRowEditIds(prev => [...prev, rowIndex.toString()])
        }
      },
      updateSubData: (rowIndex: number, subIndex: number, columnId: string, value: unknown, subRowsName: string) => {
        skipAutoResetPageIndex()
        setTempData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              // eslint-disable-next-line
              const subRows = (row as any)[subRowsName] || []
              // eslint-disable-next-line
              const updatedSubRows = subRows.map((sub: any, i: number) =>
                i === subIndex ? { ...sub, [columnId]: value } : sub,
              )
              return { ...row, [subRowsName]: updatedSubRows }
            }
            return row
          }),
        )

        /*
         * If (!rowEditIds.includes(rowIndex.toString())) {
         *   setRowEditIds(prev => [...prev, rowIndex.toString()])
         * }
         */
      },
    },
  })
  const tableContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadData({ pageIndex, pageSize, sorting, filters: columnFilters })
  }, [pageIndex, pageSize, sorting, columnFilters])

  // Expose API to parent
  useImperativeHandle(ref, () => ({
    reload: () => loadData({ pageIndex, pageSize, sorting, filters: columnFilters }),
    goToPage: (page: number) => setPageIndex(page),
    setFilters: (filters: ColumnFiltersState) => setColumnFilters(filters),
    selectedRows: table.getSelectedRowModel().rows.map(row => row.original),
    addNewRow: () => {
      if (addRowId !== '0') {
        setTempData([emptyRow ?? ({} as TData), ...tempData])
        setAddRowId('0')
        setRowEditIds(prev => {
          const arr = prev.map(item => (Number(item) + 1).toString())
          arr.push('0')
          return arr
        })
        toggleExpandAllRows(table, expandAll ?? false)
      }
    },
    rowEditIds,
    addRowId,
    updateData: (rowIndex: number, columnId: string, value: unknown) => {
      table.options.meta?.updateData?.(rowIndex, columnId, value)
    },
    updateSubData: (rowIndex: number, subIndex: number, columnId: string, value: unknown, subRowsName: string) => {
      table.options.meta?.updateSubData?.(rowIndex, subIndex, columnId, value, subRowsName)
    },
    cancelEdit: (rowId: string) => {
      if (rowId === addRowId) {
        setAddRowId('')
        const rowIds = rowEditIds.filter(id => id !== rowId).map(item => (Number(item) - 1).toString())
        setRowEditIds(rowIds)
      } else {
        const rowIds = rowEditIds.filter(id => id !== rowId)
        setRowEditIds(rowIds)
      }
      setTempData(data)
      onCancelEdit?.(rowId)
    },
  }))

  useEffect(() => {
    onEditRow?.([...rowEditIds])
  }, [rowEditIds])

  useEffect(() => {
    const savedVisibility = localStorage.getItem(COLUMN_VISIBILITY_KEY)
    if (savedVisibility) {
      try {
        const parsed = JSON.parse(savedVisibility)
        table.setColumnVisibility(parsed)
      } catch {}
    }
  }, [])

  const toggleExpandAllRows = <TData,>(table: TanstackTable<TData>, expandAll: boolean) => {
    setTimeout(() => {
      table.getRowModel().rows.forEach((row: Row<TData>) => {
        if (row.getCanExpand()) {
          row.toggleExpanded(expandAll)
        }
      })
    }, 0)
  }

  useEffect(() => {
    if (expandAll) {
      toggleExpandAllRows(table, expandAll)
    }
  }, [expandAll, table])

  useEffect(() => {
    if (tableContainerRef.current) {
      const distanceFromTop = tableContainerRef.current.getBoundingClientRect().top
      if (isBigScreen && fixHeight) {
        setTableHeight(`calc(100dvh - ${distanceFromTop + 24}px)`)
      } else {
        setTableHeight('')
      }
    }
  }, [isBigScreen])

  useEffect(() => {
    const visibility = table.getState().columnVisibility
    localStorage.setItem(COLUMN_VISIBILITY_KEY, JSON.stringify(visibility))
  }, [table.getState().columnVisibility])

  const onPageChangeHandle = useCallback((value: number) => {
    setPageIndex(value)
  }, [])

  return (
    <div
      id="table-container"
      ref={tableContainerRef}
      style={{
        height: tableHeight,
      }}
      className={cn(`relative p-2 block min-w-full h-full ${isBigScreen && 'overflow-x-auto '}  ${className}`)}
    >
      <div className="h-2" />
      <div className={`${isBigScreen && 'h-[calc(100%-60px)]'} `}>
        <div className="flex justify-between px-2">
          <div className="flex pl-2">
            <div className="flex items-center">
              <i
                className="icon-setting-4 text-body-icon-lg cursor-pointer"
                onClick={() => setShowColumnSidebar(true)}
              />
            </div>

            <div className="w-0.5 h-full bg-neutral-300 mx-3" />
            <div className="flex items-center gap-2">
              <span>تعداد نمایش</span>
              <div className=" w-28">
                <Dropdown
                  options={pageSizeOptions?.map(size => ({ label: ` ${size} ردیف`, value: size }))}
                  hasArrow
                  value={pageSize}
                  onChange={e => {
                    setPageSize(Number(e.target.value))
                    setPageIndex(0)
                  }}
                />
              </div>
            </div>
            <div className="w-0.5 h-full bg-neutral-300 mx-3" />
            <div className="flex items-center gap-2">
              <span>تعداد نتایج:</span>
              <span>{rowCount}</span>
            </div>
            <div />
          </div>
          <div className="flex items-center gap-3">{actionBar?.()}</div>
        </div>
        <div
          className={`w-full main-table ${isBigScreen && 'max-h-[calc(100%-60px)] overflow-y-auto'}  px-2 my-2 relative`}
        >
          <table className="w-full main-table ">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, columnIndex) => (
                    <th
                      key={`column-${columnIndex}`}
                      onClick={header.column.getToggleSortingHandler?.()}
                      style={{
                        cursor: header.column.getCanSort() ? 'pointer' : 'default',
                        width: header.column.id === '__select__' ? '50px' : undefined,
                        minWidth: header.column.id === '__select__' ? '50px' : undefined,
                        maxWidth: header.column.id === '__select__' ? '50px' : undefined,
                      }}
                      colSpan={header.colSpan}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <Fragment key={row.id}>
                  <tr key={row.id} className={`${row.getIsExpanded() ? 'tr-with-expand' : 'tr-normal'} `}>
                    {row.getVisibleCells().map(cell => {
                      const metaType = (cell.column.columnDef as ColumnWithMeta<TData>).meta?.type
                      const value = cell.getValue()
                      return (
                        <td
                          key={cell.id}
                          className="px-4 py-2"
                          style={
                            cell.column.id === '__select__'
                              ? { width: '50px', minWidth: '50px', maxWidth: '50px' }
                              : { width: cell.column.getSize() }
                          }
                        >
                          {cell.column.columnDef.id === '__select__' ||
                          cell.column.columnDef.id === '__action__' ||
                          //@ts-ignore
                          cell.column.columnDef?.meta?.type === 'custom' ? (
                            flexRender(cell.column.columnDef.cell, cell.getContext())
                          ) : (
                            <CellRenderer
                              value={value}
                              type={metaType}
                              editable={(cell.column.columnDef as ColumnWithMeta<TData>)?.meta?.editable}
                              editJustInAdd={(cell.column.columnDef as ColumnWithMeta<TData>)?.meta?.editJustInAdd}
                              isAddRow={addRowId === row?.id}
                              options={(cell.column.columnDef as ColumnWithMeta<TData>)?.meta?.options}
                              onChange={newValue => {
                                table.options.meta?.updateData?.(row.index, cell.column.id, newValue)
                              }}
                            />
                          )}
                        </td>
                      )
                    })}
                  </tr>
                  {row.getIsExpanded() && (
                    <tr className="tr-expand">
                      {/* 2nd row is a custom 1 cell row */}
                      <td colSpan={row.getVisibleCells().length}>
                        <div className="absolute -top-[10px] right-0 h-[10px] w-full bg-[#f4f8f7]" />
                        <div className="">{renderSubComponent?.({ row })}</div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex flex-row justify-center gap-4 pt-2">
        <Pagination
          currentPage={pageIndex + 1}
          pageSize={pageSize ?? 20}
          siblingCount={1}
          totalCount={rowCount ?? 0}
          onPageChange={onPageChangeHandle}
        />
      </div>
      {showColumnSidebar && (
        <ColumnSidebar
          allColumns={columns.filter(col => col.id !== '__select__' && col.id !== '__action__')}
          columnVisibility={table.getState().columnVisibility}
          onChange={(columnId, visible) => {
            table.getColumn(columnId)?.toggleVisibility(visible)
          }}
          onClose={() => setShowColumnSidebar(false)}
          isOpen={showColumnSidebar}
        />
      )}
    </div>
  )
}) as <TData>(props: TableProps<TData> & { ref?: React.Ref<ServerTableRef<TData>> }) => React.ReactNode
//@ts-ignore
Table.displayName = 'Table'

export { Table }
