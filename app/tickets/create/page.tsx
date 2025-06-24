'use client'

import React, { useState } from 'react'

const accommodationLocations = [
  'GCFO Quarters – Irewolede Estate',
  'New House – Irewolede Estate',
  'GRA Quarters – Trove Street, Flower Garden, GRA',
  'Honourable Qtrs 1 – Legislative Qtrs Estate',
  'Honourable Qtrs 2 – Legislative Qtrs Estate',
  'Yellow House – Mandate III Estate',
  'Ghosh House – Mandate III Estate',
  'Jaspal House – Mandate III Estate',
  'Ofa Garage',
]

const accommodationIssues = [
  'Generator',
  'Water/Plumbing',
  'Electrical (ACs, lighting etc.)',
  'Furniture',
  'Environment (weed, fence, drainage etc.)',
  'Others',
]

const categories: Record<string, string[]> = {
  'Office Issue': [
    'Water/Plumbing',
    'Dispenser',
    'Electrical (AC, lighting etc.)',
    'Furniture',
    'Cleaning',
    'Others',
  ],
  'Vehicle Issue': [
    'Periodic Maintenance',
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
  'Supply Chain / Store',
  'Admin / Health / Security / Legal',
  'Production',
  'Accounts / Finance',
  'Electrical / Maintenance',
  'IT',
]

const staffLocations = [
  'KAM HQ',
  'KSICL – Jimba',
  'KSICL – Sagamu / Hullmac',
  'KAM Haulage',
  'Dimkit Ganmo',
  'Dimkit Kaduna',
  'Lagos Office',
]

const RaiseTicketPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    staffLocation: '',
    department: '',
    category: '',
    accLocation: '',
    accIssue: '',
    subcategory: '',
    title: '',
    details: '',
    date: '',
    screenshot: null as File | null,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'category' && {
        subcategory: '',
        accLocation: '',
        accIssue: '',
      }),
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, screenshot: file }))
  }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   console.log('Ticket Submitted:', formData)
  //   alert('Your ticket has been successfully submitted.')

  //   setFormData({
  //     fullName: '',
  //     email: '',
  //     phone: '',
  //     staffLocation: '',
  //     department: '',
  //     category: '',
  //     accLocation: '',
  //     accIssue: '',
  //     subcategory: '',
  //     title: '',
  //     details: '',
  //     date: '',
  //     screenshot: null,
  //   })
  // }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    const payload = new FormData()
    payload.append('name', formData.fullName)
    payload.append('email', formData.email)
    payload.append('phone', formData.phone)
    payload.append('location', formData.staffLocation || formData.accLocation)
    payload.append('department', formData.department)
    payload.append('category', formData.category)
    payload.append(
      'subCategory',
      formData.category === 'Accommodation/Housing Issues'
        ? formData.accIssue
        : formData.subcategory
    )
    payload.append('otherSubCategory', '') // optionally allow extra input in future
    payload.append('title', formData.title)
    payload.append('details', formData.details)
    if (formData.screenshot) {
      payload.append('image', formData.screenshot)
    }
  
    try {
      const res = await fetch('http://localhost:5000/api/tickets', {
        method: 'POST',
        body: payload,
      })
  
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')
  
      alert('Ticket submitted successfully!')
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        staffLocation: '',
        department: '',
        category: '',
        accLocation: '',
        accIssue: '',
        subcategory: '',
        title: '',
        details: '',
        date: '',
        screenshot: null,
      })
    } catch (err: any) {
      console.error(err)
      alert('Failed to submit ticket. Check console for details.')
    }
  }
  

  const inputClass = 'w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'

  return (
    <div className="container mx-auto max-w-3xl px-4 pb-12 pt-5">

      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Raise a New Support Ticket</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number (CUG Preferred)</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className={inputClass} />
          </div>

          {/* Work Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Staff Location</label>
            <select name="staffLocation" value={formData.staffLocation} onChange={handleChange} required className={inputClass}>
              <option value="">-- Select Location --</option>
              {staffLocations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select name="department" value={formData.department} onChange={handleChange} required className={inputClass}>
              <option value="">-- Select Department --</option>
              {departments.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
            </select>
          </div>

          {/* Category & Subcategory */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required className={inputClass}>
              <option value="">-- Select Category --</option>
              <option value="Accommodation/Housing Issues">Accommodation / Housing Issues</option>
              {Object.keys(categories).map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          {/* Accommodation Fields */}
          {formData.category === 'Accommodation/Housing Issues' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Accommodation Location</label>
                <select name="accLocation" value={formData.accLocation} onChange={handleChange} required className={inputClass}>
                  <option value="">-- Select Location --</option>
                  {accommodationLocations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Accommodation Issue</label>
                <select name="accIssue" value={formData.accIssue} onChange={handleChange} required className={inputClass}>
                  <option value="">-- Select Issue --</option>
                  {accommodationIssues.map((issue) => <option key={issue} value={issue}>{issue}</option>)}
                </select>
              </div>
            </>
          )}

          {/* Subcategory for other categories */}
          {formData.category && formData.category !== 'Accommodation/Housing Issues' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Subcategory</label>
              <select name="subcategory" value={formData.subcategory} onChange={handleChange} required className={inputClass}>
                <option value="">-- Select Subcategory --</option>
                {categories[formData.category]?.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          )}

          {/* Ticket Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Complaint Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Detailed Description</label>
            <textarea name="details" rows={4} value={formData.details} onChange={handleChange} required className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Complaint</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Attach Screenshot (optional)</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className={inputClass} />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RaiseTicketPage
