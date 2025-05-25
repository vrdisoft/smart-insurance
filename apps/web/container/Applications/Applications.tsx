'use client'
import { Input, Table } from '@repo/ui'
import { useGetApiInsuranceFormsSubmissions } from '../../services/insurance-service/installment.service'
import { ColumnWithMeta, LoadFn, ServerTableRef } from '@repo/ui/src/components/Table/type'
import { UsersApplications } from '../../services/insurance-service/insurance.schemas'
import { useEffect, useRef, useState } from 'react'

export const Applications = () => {
  const { data: formsSubmissions, isLoading } = useGetApiInsuranceFormsSubmissions()
  console.log('Applications data:', formsSubmissions)
  const tableRef = useRef<ServerTableRef<UsersApplications>>(null)
  const [data, setData] = useState<UsersApplications[]>([])
  const [pageIndex, setPageIndex] = useState(0)
  const [rowCount, setRowCount] = useState(0)

  const columnConfig: ColumnWithMeta<UsersApplications>[] =
    formsSubmissions?.columns.map(col => ({
      id: col,
      accessorKey: col,
      header: col,
      visible: true,
    })) || []

  useEffect(() => {
    setData(formsSubmissions?.data ?? [])
    setRowCount((formsSubmissions?.data?.length ?? 0) + 1)
  }, [formsSubmissions?.data])
  useEffect(() => {
    console.log('Applications data updated:', data)
  }, [data])

  const loadData: LoadFn = async ({ pageIndex, pageSize, sorting }) => {
    const filterEntries = Object.entries({}).filter(([, val]) => !!val)

    const customFilters = filterEntries.map(([id, value]) => ({ id, value }))

    const filterString = customFilters.map(f => `${f.id}:${f.value}`).join(',')

    const params = new URLSearchParams({
      page: (pageIndex + 1).toString(),
      limit: pageSize.toString(),
      sortBy: sorting[0]?.id || '',
      sortOrder: sorting[0]?.desc ? 'desc' : 'asc',
      filter: filterString,
    })

    // const res = await fetch(`/api/users?${params}`)
    // const json = await res.json()
    // setData(json.data)
    // setRowCount(json.total)
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
      <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
        <Table<UsersApplications>
          tableId="usersApplications"
          columns={columnConfig}
          data={data}
          rowCount={rowCount}
          loadData={loadData}
          ref={tableRef}
          actionBar={() => (
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search by name or email"
                className="w-64"
                onChange={e => {
                  const searchValue = e.target.value
                  tableRef.current?.setFilters([{ id: 'name', value: searchValue }])
                }}
              />
            </div>
          )}
        />
      </div>
    </section>
  )
}
