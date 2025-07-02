'use client'

import React, { useState, useEffect, ChangeEvent, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth' // ✅ Import auth hook

type Ticket = {
  id: number
  title: string
  details: string
  date: string
  assignedTo: string
  status: string
  createdBy: string
  department: string
  image?: string
  images?: string[]
}

type User = {
  id: number
  name: string
}


const parseTicketDateToISO = (dateStr: string): string | null => {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return null
  return date.toISOString().split('T')[0]
}

const Page = () => {
  const { user } = useAuth()
  const router = useRouter()

  // ✅ Restrict non-Superadmin users
   useEffect(() => {
    if (!user) return // Wait for auth to resolve
    if (user.role !== 'Superadmin') {

      console.log("unauthorized user")
      router.push('/unauthorized') // Or login page
    }
  }, [user, router])

  const [usersMap, setUsersMap] = useState<Record<number, string>>({})

  const [tickets, setTickets] = useState<Ticket[]>([])
  const [openTickets, setOpenTickets] = useState<Record<number, boolean>>({})
  const [filtersOpen, setFiltersOpen] = useState(true)
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    department: '',
    status: '',
  })

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

  useEffect(() => {
  const fetchUsersAndTickets = async () => {
    try {
      // Step 1: Fetch all users
      const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`)
      const users: User[] = await userRes.json()
      const userMap = Object.fromEntries(users.map((u) => [u.id, u.name]))
      setUsersMap(userMap)

      // Step 2: Fetch tickets
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tickets`)
      const raw = await res.json()

      const processed: Ticket[] = raw.map((item: any) => ({
        id: item.id,
        title: item.name || 'Untitled Ticket',
        details: item.email || 'No details provided',
        date: item.created_at || new Date().toISOString(),
        assignedTo: userMap[item.assigned_to] ?? 'Unassigned',
        status: item.status || 'Pending',
        createdBy: item.created_by || 'System',
        department: item.department || 'General',
        image: item.image,
        images: item.image ? [item.image] : [],
      }))

      setTickets(processed)

      const openState = Object.fromEntries(processed.map((t) => [t.id, true]))
      setOpenTickets(openState)
    } catch (err) {
      console.error('Failed to fetch users or tickets:', err)
    }
  }

  fetchUsersAndTickets()
}, [])


  const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const uniqueValues = (key: keyof Ticket): string[] => {
    const set = new Set<string>(tickets.map((t) => t[key] as string))
    return Array.from(set)
  }

  const filteredTickets = tickets.filter((ticket) => {
    const ticketISODate = parseTicketDateToISO(ticket.date)
    if (!ticketISODate) return false
    if (filters.startDate && ticketISODate < filters.startDate) return false
    if (filters.endDate && ticketISODate > filters.endDate) return false
    if (filters.department && ticket.department !== filters.department) return false
    if (filters.status && ticket.status !== filters.status) return false
    return true
  })

  const toggleTicket = (id: number) => {
    setOpenTickets((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  if (!user || user.role !== 'Superadmin') {
    return (
      <div className="text-center text-gray-600 mt-20">
        Loading or unauthorized access...
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl space-y-6">
      {/* Filters */}
      <div
        ref={filterRef}
        className="fixed top-16 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4 sm:px-6 z-50 bg-white p-4 shadow-md border border-gray-200"
        style={{ borderRadius: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Filter Tickets</h2>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="text-gray-600 hover:text-gray-800"
            aria-expanded={filtersOpen}
          >
            {filtersOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
        {filtersOpen && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['startDate', 'endDate'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                  {field === 'startDate' ? 'Start Date' : 'End Date'}
                </label>
                <input
                  type="date"
                  id={field}
                  name={field}
                  value={filters[field as keyof typeof filters]}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}
            {['department', 'status'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <select
                  id={field}
                  name={field}
                  value={filters[field as keyof typeof filters]}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All {field}</option>
                  {uniqueValues(field as keyof Ticket).map((val) => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ height: filterHeight }} />

      {/* Tickets */}
      <div className="mt-8 grid grid-cols-1 gap-6">
        {filteredTickets.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No tickets found for selected filters.</p>
        ) : (
          filteredTickets.map(({ id, title, details, date, assignedTo, status, createdBy, department, images }) => (
            <div
              key={id}
              className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 bg-gray-100 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                <button
                  onClick={() => toggleTicket(id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {openTickets[id] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>
              {openTickets[id] && (
                <div className="px-6 py-4 space-y-6 bg-white transition-all">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500">Details</h4>
                    <p className="text-base text-gray-700">{details}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[["Date", date], ["Assigned To", assignedTo], ["Status", status], ["Created By", createdBy], ["Department", department]].map(
                      ([label, value], i) => (
                        <div key={i}>
                          <h4 className="text-sm font-semibold text-gray-500">{label}</h4>
                          <p className="text-gray-700">{value}</p>
                        </div>
                      )
                    )}
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
          ))
        )}
      </div>
    </div>
  )
}

export default Page
