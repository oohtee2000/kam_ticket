'use client'

import React, { useState, ChangeEvent, useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

// Define the ticket type
type Ticket = {
  id: number
  title: string
  details: string
  date: string
  assignedTo: string
  status: string
  createdBy: string
  department: string
  images?: string[] // optional image URLs
}

const tickets: Ticket[] = [
  { id: 1, title: 'Sample Ticket', details: 'Details here', date: '2025-05-25', assignedTo: 'Alice', status: 'Open', createdBy: 'Bob', department: 'IT' }, 
  { id: 2, title: 'Sample Ticket', details: 'Details here', date: '2025-05-25', assignedTo: 'Alice', status: 'Open', createdBy: 'Bob', department: 'IT' },
  { id: 3, title: 'Sample Ticket', details: 'Details here', date: '2025-05-25', assignedTo: 'Alice', status: 'Open', createdBy: 'Bob', department: 'IT' }
]

const uniqueValues = (key: Exclude<keyof Ticket, 'id'>): string[] => {
  const set = new Set<string>(tickets.map((t) => t[key] as string))
  return Array.from(set)
}

const parseTicketDateToISO = (dateStr: string): string | null => {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return null
  return date.toISOString().split('T')[0]
}

const Page = () => {
  const [filtersOpen, setFiltersOpen] = useState(true)
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    department: '',
    assignedTo: '',
    createdBy: '',
    status: '',
  })

  // openTickets keyed by ticket id (number), value boolean (open or closed)
  const [openTickets, setOpenTickets] = useState<Record<number, boolean>>(
    tickets.reduce((acc, ticket) => {
      acc[ticket.id] = true
      return acc
    }, {} as Record<number, boolean>)
  )

  // Ref to the filter container for height calculation
  const filterRef = useRef<HTMLDivElement>(null)
  const [filterHeight, setFilterHeight] = useState(0)

  useEffect(() => {
    const updateHeight = () => {
      if (filterRef.current) {
        setFilterHeight(filterRef.current.getBoundingClientRect().height)
      }
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [filtersOpen])

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const filteredTickets = tickets.filter((ticket) => {
    const ticketISODate = parseTicketDateToISO(ticket.date)
    if (!ticketISODate) return false

    if (filters.startDate && ticketISODate < filters.startDate) return false
    if (filters.endDate && ticketISODate > filters.endDate) return false
    if (filters.department && ticket.department !== filters.department) return false
    if (filters.assignedTo && ticket.assignedTo !== filters.assignedTo) return false
    if (filters.createdBy && ticket.createdBy !== filters.createdBy) return false
    if (filters.status && ticket.status !== filters.status) return false

    return true
  })

  const toggleTicket = (id: number) => {
    setOpenTickets((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl space-y-6">
      {/* Filter section - fixed */}
      <div
        ref={filterRef}
        className="fixed top-16 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4 sm:px-6 z-50 bg-white p-4 shadow-md border border-gray-200 rounded-md"
        style={{ borderRadius: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Filter Tickets</h2>
          <button
            onClick={() => setFiltersOpen((open) => !open)}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
            aria-expanded={filtersOpen}
            aria-controls="filter-controls"
            aria-label={filtersOpen ? 'Collapse filter section' : 'Expand filter section'}
          >
            {filtersOpen ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Filters - toggle visibility */}
        {filtersOpen && (
          <div
            id="filter-controls"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Date Range Filter */}
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Other filters */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                id="department"
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Departments</option>
                {uniqueValues('department').map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
                Assigned To
              </label>
              <select
                id="assignedTo"
                name="assignedTo"
                value={filters.assignedTo}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Assignees</option>
                {uniqueValues('assignedTo').map((assignee) => (
                  <option key={assignee} value={assignee}>
                    {assignee}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="createdBy" className="block text-sm font-medium text-gray-700">
                Created By
              </label>
              <select
                id="createdBy"
                name="createdBy"
                value={filters.createdBy}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Creators</option>
                {uniqueValues('createdBy').map((creator) => (
                  <option key={creator} value={creator}>
                    {creator}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Statuses</option>
                {uniqueValues('status').map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Spacer div to push tickets below fixed filter */}
      <div style={{ height: filterHeight }} />

      {/* Tickets List */}
      <div className="mt-8 grid grid-cols-1 gap-6">
        {filteredTickets.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No tickets found for selected filters.</p>
        ) : (
          filteredTickets.map(
            ({
              id,
              title,
              details,
              date,
              assignedTo,
              status,
              createdBy,
              department,
              images
            }) => (
              <div
                key={id}
                className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-gray-100 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                  <button
                    onClick={() => toggleTicket(id)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Toggle card details"
                  >
                    {openTickets[id] ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {openTickets[id] && (
                  <div className="px-6 py-4 space-y-6 transition-all bg-white rounded-xl shadow-sm">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500">Details</h4>
                      <p className="text-base text-gray-700">{details}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500">Date</h4>
                        <p className="text-gray-700">{date}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500">Assigned To</h4>
                        <p className="text-gray-700">{assignedTo}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500">Status</h4>
                        <p className="text-gray-700">{status}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500">Created By</h4>
                        <p className="text-gray-700">{createdBy}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500">Department</h4>
                        <p className="text-gray-700">{department}</p>
                      </div>
                    </div>

                    {images && images.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500">Images</h4>
                        <div className="flex space-x-4 overflow-x-auto py-2">
                          {images.map((imgUrl, idx) => (
                            <img
                              key={idx}
                              src={imgUrl}
                              alt={`Ticket Image ${idx + 1}`}
                              className="w-32 h-24 object-cover rounded-lg"
                              loading="lazy"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          )
        )}
      </div>
    </div>
  )
}

export default Page
