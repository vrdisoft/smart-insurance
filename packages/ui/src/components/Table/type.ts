import { ColumnDef, ColumnFiltersState, Row, SortingState } from '@tanstack/react-table'
export type ServerTableRef<TData> = {
  reload: () => void
  goToPage: (page: number) => void
  setFilters: (filters: ColumnFiltersState) => void
  selectedRows: TData[]
  addNewRow: () => void
  rowEditIds: string[]
  addRowId: string
  columnFilters: ColumnFiltersState
  updateData: (rowIndex: number, columnId: string, value: unknown) => void
  updateSubData: (rowIndex: number, subIndex: number, columnId: string, value: unknown, subRowsName: string) => void
  cancelEdit: (rowId: string) => void
}
export type CellType =
  | 'text'
  | 'url'
  | 'email'
  | 'date'
  | 'currency'
  | 'image'
  | 'custom'
  | 'boolean'
  | 'select'
  | 'dateTime'

// eslint-disable-next-line
export type ColumnWithMeta<T> = ColumnDef<T, any> & {
  meta?: {
    type?: CellType
    editable?: boolean
    editJustInAdd?: boolean
    options?: { label: string; value: string }[]
  }
  visible?: boolean
}

export type LoadFn = (params: {
  pageIndex: number
  pageSize: number
  sorting: SortingState
  filters: ColumnFiltersState
}) => void | Promise<void>

export type TableProps<TData> = {
  tableId: string
  columns: ColumnWithMeta<TData>[]
  data: TData[]
  rowCount: number
  loadData: LoadFn
  pageSizeOptions?: number[]
  enableSelection?: boolean
  className?: string
  fixHeight?: boolean
  actionBar?: () => React.ReactNode
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement
  getRowCanExpand?: (row: Row<TData>) => boolean
  expandAll?: boolean
  emptyRow?: TData
  onEditRow?: (rowEditIds: string[]) => void
  onCancelEdit?: (rowId: string) => void
}
