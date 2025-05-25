import { cn } from '../../lib/utils'
import { memo } from 'react'

import { DOTS, usePagination } from './usePagination'
export const PaginationComponent = (props: {
  totalCount: number
  pageSize: number
  siblingCount: number
  currentPage: number
  className?: string
  onPageChange?: (value: number) => void
}) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })
  console.log(currentPage, paginationRange)
  if (currentPage === 0 || (paginationRange?.length ?? 0) < 2) {
    return null
  }

  const onNext = () => {
    onPageChange?.(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange?.(currentPage - 1)
  }

  const lastPage = paginationRange?.[paginationRange.length - 1]
  return (
    <ul className={cn('flex list-none', { className })}>
      <li
        className={cn(
          'text-body-md flex items-center max-sm:justify-end w-10 h-10 border-primary-500 text-primary-500 cursor-pointer ml-0 md:ml-10',
          {
            'pointer-events-none  border-neutral-500  text-neutral-500 cursor-default': currentPage === 1,
          },
        )}
        onClick={onPrevious}
      >
        <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 ">
          <i className="icon-arrow-left rotate-180 w-3 h-3 text-[12px] before:!font-bold" />
        </div>
      </li>
      {paginationRange?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className="text-body-md flex items-center justify-center w-10 h-10">
              &#8230;
            </li>
          )
        }

        return (
          <li
            key={index}
            className={cn(
              'text-body-md flex items-center justify-center w-10 h-10 cursor-pointer hover:bg-primary-100 hover:text-white hover:rounded-full mx-px',
              {
                'rounded-full  text-white bg-primary-500 cursor-default': pageNumber === currentPage,
              },
            )}
            onClick={() => onPageChange?.(Number(pageNumber))}
          >
            {pageNumber}
          </li>
        )
      })}
      <li
        className={cn(
          'text-body-md flex items-center w-10 h-10 border-primary-500 text-primary-500 cursor-pointer mr-0 md:mr-10',
          {
            'pointer-events-none  border-neutral-500  text-neutral-500 cursor-default': currentPage === lastPage,
          },
        )}
        onClick={onNext}
      >
        <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-primary-500 ">
          <i className="icon-arrow-left w-4 h-4 text-primary-500 text-[12px] before:!font-bold" />
        </div>
      </li>
    </ul>
  )
}

export const Pagination = memo(PaginationComponent)
