'use client'
import { Input, Table } from '@repo/ui'
import { useGetApiInsuranceFormsSubmissions } from '../../services/insurance-service/installment.service'
import { ColumnWithMeta, LoadFn, ServerTableRef } from '@repo/ui/src/components/Table/type'
import { UsersApplications } from '../../services/insurance-service/insurance.schemas'
import { useEffect, useRef, useState } from 'react'
import { ColumnSort } from '@tanstack/react-table'

export const Applications = () => {
  const { data: formsSubmissions, isLoading } = useGetApiInsuranceFormsSubmissions()
  console.log('Applications data:', formsSubmissions)
  const tableRef = useRef<ServerTableRef<UsersApplications>>(null)
  const [data, setData] = useState<UsersApplications[]>([])
  const [rowCount, setRowCount] = useState(0)

  const columnConfig: ColumnWithMeta<UsersApplications>[] =
    formsSubmissions?.columns.map(col => ({
      id: col,
      accessorKey: col,
      header: col,
      visible: true,
    })) || []

  useEffect(() => {
    setRowCount(formsSubmissions?.data?.length ?? 0)
  }, [formsSubmissions?.data])

  const loadData: LoadFn = async ({ pageIndex, pageSize, sorting, filters }) => {
    let filtered = formsSubmissions?.data ?? []

    // Search filter (by name or insurance type)
    const search = filters[0]?.value as string
    if (filters[0]?.value) {
      const lower = search.toLowerCase()
      filtered = filtered.filter(row => Object.values(row).some(val => val?.toString()?.toLowerCase().includes(lower)))
    }

    // Sorting
    if (sorting && sorting.length > 0) {
      const { id, desc } = sorting[0] as ColumnSort
      filtered = [...filtered].sort((a, b) => {
        if (a[id as keyof UsersApplications] < b[id as keyof UsersApplications]) return desc ? 1 : -1
        if (a[id as keyof UsersApplications] > b[id as keyof UsersApplications]) return desc ? -1 : 1
        return 0
      })
    }

    // Pagination
    const start = (pageIndex - 1) * pageSize
    const paged = filtered.slice(start, start + pageSize)

    if (search?.length > 0) {
      setRowCount(filtered.length)
    } else {
      setRowCount(formsSubmissions?.data?.length ?? 0)
    }
    setData(paged)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-4 text-gray-500 text-lg">Loading...</span>
      </div>
    )
  }
  return (
    <section>
      <div className="max-w-6xl mx-auto p-2 md:p-6 bg-white dark:bg-gray-800 rounded shadow">
        <Table<UsersApplications>
          tableId="usersApplications"
          columns={columnConfig}
          data={data}
          rowCount={rowCount}
          loadData={loadData}
          ref={tableRef}
          actionBar={() => (
            <div className="flex items-center gap-2 max-sm:w-full">
              <Input
                placeholder="Search "
                className="w-full md:w-96"
                onChange={e => {
                  const searchValue = e.target.value
                  tableRef.current?.setFilters([{ id: 'name', value: searchValue }])
                }}
                value={(tableRef.current?.columnFilters?.[0]?.value as string) || ''}
              />
            </div>
          )}
          pageSizeOptions={[2, 10, 20, 50, 100]}
        />
      </div>
    </section>
  )
}
