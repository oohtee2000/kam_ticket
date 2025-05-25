'use client'

import React, { useState } from 'react'

const categories: Record<string, string[]> = {
  'Accommodation/Housing Issues': [
    'GCFO Quarters – Irewolede Estate',
    'New House – Irewolede Estate',
    'GRA Quarters – Trove Street, Flower Garden, GRA',
    'Honourable Qtrs 1 – Legislative Qtrs Estate',
    'Honourable Qtrs 2 – Legislative Qtrs Estate',
    'Yellow House – Mandate III Estate',
    'Ghosh House – Mandate III Estate',
    'Jaspal House – Mandate III Estate',
    'Ofa Garage',
  ],
  'Office Issue': [
    'Water/Plumbing',
    'Dispenser',
    'Electrical (AC, lighting etc.)',
    'Furniture',
    'Cleaning',
    'Others',
  ],
  'Vehicle Issue': [
    'Periodic maintenance',
    'Battery',
    'Electrical/Mechanical Issue',
    'Accidents',
    'Tyre',
    'Vehicle Registration',
    'Others',
  ],
}

const departments = [
  'HR',
  'Audit',
  'Supply Chain/Store',
  'Admin/Health/Security/Legal',
  'Production',
  'Account/Finance',
  'Electrical/Maintenance',
  'IT',
]

const staffLocations = [
  'KAM HQ',
  'KSICL – Jimba',
  'KSICL – Sagamu/Hullmac',
  'KAM Haulage',
  'Dimkit Ganmo',
  'Dimkit Kaduna',
  'Lagos Office',
]

const RaiseTicketPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    date: '',
    assignedTo: '',
    status: '',
    createdBy: '',
    department: '',
    staffLocation: '',
    category: '',
    subcategory: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    if (name === 'category') {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        subcategory: '',
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Ticket Submitted:', formData)

    alert('Ticket Raised Successfully!')
    setFormData({
      title: '',
      details: '',
      date: '',
      assignedTo: '',
      status: '',
      createdBy: '',
      department: '',
      staffLocation: '',
      category: '',
      subcategory: '',
    })
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 pt-[120px] pb-10">
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Raise a New Ticket</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Details */}
          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700">Details</label>
            <textarea
              name="details"
              id="details"
              rows={4}
              value={formData.details}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Assigned To */}
          <div>
            <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">Assigned To</label>
            <input
              type="text"
              name="assignedTo"
              id="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Created By */}
          <div>
            <label htmlFor="createdBy" className="block text-sm font-medium text-gray-700">Created By</label>
            <input
              type="text"
              name="createdBy"
              id="createdBy"
              value={formData.createdBy}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Department */}
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
            <select
              name="department"
              id="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Staff Location */}
          <div>
            <label htmlFor="staffLocation" className="block text-sm font-medium text-gray-700">Staff Location</label>
            <select
              name="staffLocation"
              id="staffLocation"
              value={formData.staffLocation}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Location</option>
              {staffLocations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Category</option>
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          <div>
            <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">Subcategory</label>
            <select
              name="subcategory"
              id="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              required
              disabled={!formData.category}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Subcategory</option>
              {formData.category &&
                categories[formData.category].map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  )
}

export default RaiseTicketPage
