import React, { useState, useEffect } from 'react'
import { FiUser, FiBriefcase, FiMail, FiPhone, FiMessageSquare, FiCheckCircle, FiUpload } from 'react-icons/fi'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/movlrjlp'

export default function WebsiteDiscoveryForm() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [currentSection, setCurrentSection] = useState(1)

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    businessDescription: '',
    whyWebsite: '',
    websiteGoals: [],
    websiteGoalsOther: '',
    nextAction: '',
    customerType: '',
    customerProblem: '',
    customerQuestions: '',
    hasLogo: '',
    hasContent: '',
    monthlySupportOption: '',
    upfrontPaymentOption: '',
    timeline: '',
    additionalInfo: '',
    confirmationChecked: false
  })

  // File uploads state
  const [files, setFiles] = useState({
    logo: null,
    photos: [],
    documents: []
  })

  useEffect(() => {
    document.title = 'Website Discovery Form — Embark Digitals'
    window.scrollTo(0, 0)
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleCheckboxGroup = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(v => v !== value)
        : [...prev[name], value]
    }))
  }

  const handleFileChange = (e, fieldName) => {
    const { files: fileList } = e.target
    if (fieldName === 'logo') {
      setFiles(prev => ({ ...prev, logo: fileList[0] || null }))
    } else {
      setFiles(prev => ({ ...prev, [fieldName]: Array.from(fileList) }))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    // Prepare form data with files
    const submitData = new FormData()

    // Add all text fields
    Object.keys(formData).forEach(key => {
      if (Array.isArray(formData[key])) {
        submitData.append(key, formData[key].join(', '))
      } else {
        submitData.append(key, formData[key])
      }
    })

    // Add files
    if (files.logo) {
      submitData.append('logo', files.logo)
    }
    files.photos.forEach((photo, index) => {
      submitData.append(`photo_${index + 1}`, photo)
    })
    files.documents.forEach((doc, index) => {
      submitData.append(`document_${index + 1}`, doc)
    })

    submitData.append('_subject', 'Website Discovery Form Submission')

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: submitData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (res.ok) {
        setStatus('success')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const j = await res.json().catch(() => ({}))
        setErrorMsg(j?.error || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50/30 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <div className="rounded-3xl bg-white/90 backdrop-blur-md ring-1 ring-white/50 shadow-xl p-8 md:p-12 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
              <FiCheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-brand-700 mb-4">
              Thank You!
            </h1>
            <p className="text-lg text-slate-600 mb-2">
              We've received your information and will be in touch shortly.
            </p>
            <p className="text-slate-500">
              We're excited to help bring your website vision to life.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50/30 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-700 mb-3">
            Embark Digitals – Website Discovery Form
          </h1>
          <p className="text-lg text-slate-600 mb-2">
            This short form helps us understand your business and recommend the best website solution for you.
          </p>
          <p className="text-slate-500 text-sm">
            There are no right or wrong answers. If you're unsure about anything, that's okay.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION 1: About You & Your Business */}
          <section className="rounded-3xl bg-white/90 backdrop-blur-md ring-1 ring-slate-200 shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-brand-700">About You & Your Business</h2>
              <span className="text-sm font-medium text-slate-500">Section 1 of 7</span>
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
                  Your full name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40 transition"
                    placeholder="John Smith"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="businessName" className="block text-sm font-semibold text-slate-700 mb-2">
                  Business or organisation name
                </label>
                <div className="relative">
                  <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40 transition"
                    placeholder="My Business Name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Best email address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40 transition"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone / WhatsApp number
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40 transition"
                    placeholder="+27 60 123 4567"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="businessDescription" className="block text-sm font-semibold text-slate-700 mb-2">
                  What does your business do?
                </label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-3 top-3 text-slate-400" />
                  <textarea
                    id="businessDescription"
                    name="businessDescription"
                    required
                    value={formData.businessDescription}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40 transition resize-none"
                    placeholder="Tell us about your business in your own words..."
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: Why You Want a Website */}
          <section className="rounded-3xl bg-white/90 backdrop-blur-md ring-1 ring-slate-200 shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-brand-700">Why You Want a Website</h2>
              <span className="text-sm font-medium text-slate-500">Section 2 of 7</span>
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="whyWebsite" className="block text-sm font-semibold text-slate-700 mb-2">
                  Why do you want a website right now?
                </label>
                <textarea
                  id="whyWebsite"
                  name="whyWebsite"
                  required
                  value={formData.whyWebsite}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40 transition resize-none"
                  placeholder="Share what's motivating you to get a website now..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  What do you hope this website will help you achieve? (Select all that apply)
                </label>
                <div className="space-y-2">
                  {[
                    'More customers contacting you',
                    'People trusting your business',
                    'Selling products or services online',
                    'Sharing information about your business'
                  ].map(goal => (
                    <label key={goal} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition">
                      <input
                        type="checkbox"
                        checked={formData.websiteGoals.includes(goal)}
                        onChange={() => handleCheckboxGroup('websiteGoals', goal)}
                        className="mt-0.5 w-5 h-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                      />
                      <span className="text-slate-700">{goal}</span>
                    </label>
                  ))}
                  <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition">
                    <input
                      type="checkbox"
                      checked={formData.websiteGoals.includes('Other')}
                      onChange={() => handleCheckboxGroup('websiteGoals', 'Other')}
                      className="mt-0.5 w-5 h-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                    />
                    <div className="flex-1">
                      <span className="text-slate-700">Other</span>
                      {formData.websiteGoals.includes('Other') && (
                        <input
                          type="text"
                          name="websiteGoalsOther"
                          value={formData.websiteGoalsOther}
                          onChange={handleInputChange}
                          placeholder="Please specify..."
                          className="mt-2 w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40 transition"
                        />
                      )}
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  If someone visits your website, what would you love them to do next?
                </label>
                <div className="space-y-2">
                  {[
                    'Call or WhatsApp you',
                    'Fill in a contact form',
                    'Buy something',
                    'Book a service',
                    'Learn more about your business'
                  ].map(action => (
                    <label key={action} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition">
                      <input
                        type="radio"
                        name="nextAction"
                        value={action}
                        required
                        checked={formData.nextAction === action}
                        onChange={handleInputChange}
                        className="w-5 h-5 border-slate-300 text-brand-600 focus:ring-brand-500"
                      />
                      <span className="text-slate-700">{action}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: Your Customers */}
          <section className="rounded-3xl bg-white/90 backdrop-blur-md ring-1 ring-slate-200 shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-brand-700">Your Customers</h2>
              <span className="text-sm font-medium text-slate-500">Section 3 of 7</span>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Who do you mainly serve?
                </label>
                <div className="space-y-2">
                  {['Individuals', 'Businesses', 'Community / organisations'].map(type => (
                    <label key={type} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition">
                      <input
                        type="radio"
                        name="customerType"
                        value={type}
                        required
                        checked={formData.customerType === type}
                        onChange={handleInputChange}
                        className="w-5 h-5 border-slate-300 text-brand-600 focus:ring-brand-500"
                      />
                      <span className="text-slate-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="customerProblem" className="block text-sm font-semibold text-slate-700 mb-2">
                  What problem do people usually come to you with?
                </label>
                <textarea
                  id="customerProblem"
                  name="customerProblem"
                  required
                  value={formData.customerProblem}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40 transition resize-none"
                  placeholder="Describe the main problem or need your customers have..."
                />
              </div>

              <div>
                <label htmlFor="customerQuestions" className="block text-sm font-semibold text-slate-700 mb-2">
                  What do people usually ask before they decide to work with you?
                </label>
                <textarea
                  id="customerQuestions"
                  name="customerQuestions"
                  required
                  value={formData.customerQuestions}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40 transition resize-none"
                  placeholder="What questions do potential customers ask you most often?"
                />
              </div>
            </div>
          </section>

          {/* SECTION 4: What You Already Have */}
          <section className="rounded-3xl bg-white/90 backdrop-blur-md ring-1 ring-slate-200 shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-brand-700">What You Already Have</h2>
              <span className="text-sm font-medium text-slate-500">Section 4 of 7</span>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Do you already have a logo?
                </label>
                <div className="space-y-2">
                  {['Yes', 'No', 'Not sure'].map(option => (
                    <label key={option} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition">
                      <input
                        type="radio"
                        name="hasLogo"
                        value={option}
                        required
                        checked={formData.hasLogo === option}
                        onChange={handleInputChange}
                        className="w-5 h-5 border-slate-300 text-brand-600 focus:ring-brand-500"
                      />
                      <span className="text-slate-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Do you already have photos or content you'd like used?
                </label>
                <div className="space-y-2">
                  {['Yes', 'No', 'Some'].map(option => (
                    <label key={option} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition">
                      <input
                        type="radio"
                        name="hasContent"
                        value={option}
                        required
                        checked={formData.hasContent === option}
                        onChange={handleInputChange}
                        className="w-5 h-5 border-slate-300 text-brand-600 focus:ring-brand-500"
                      />
                      <span className="text-slate-700">{option}</span>
                    </label>
                  ))}
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  If not, that's okay — we can assist.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 5: Optional File Uploads */}
          <section className="rounded-3xl bg-white/90 backdrop-blur-md ring-1 ring-slate-200 shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-brand-700">Optional File Uploads</h2>
              <span className="text-sm font-medium text-slate-500">Section 5 of 7</span>
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="logoUpload" className="block text-sm font-semibold text-slate-700 mb-2">
                  Upload your logo (optional)
                </label>
                <div className="relative">
                  <input
                    id="logoUpload"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, 'logo')}
                    className="hidden"
                  />
                  <label
                    htmlFor="logoUpload"
                    className="flex items-center justify-center gap-2 w-full px-4 py-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-brand-500 cursor-pointer transition"
                  >
                    <FiUpload className="text-slate-500" />
                    <span className="text-slate-600">
                      {files.logo ? files.logo.name : 'Choose file or drag here'}
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="photosUpload" className="block text-sm font-semibold text-slate-700 mb-2">
                  Upload any photos you would like used (optional)
                </label>
                <div className="relative">
                  <input
                    id="photosUpload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e, 'photos')}
                    className="hidden"
                  />
                  <label
                    htmlFor="photosUpload"
                    className="flex items-center justify-center gap-2 w-full px-4 py-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-brand-500 cursor-pointer transition"
                  >
                    <FiUpload className="text-slate-500" />
                    <span className="text-slate-600">
                      {files.photos.length > 0 ? `${files.photos.length} file(s) selected` : 'Choose files or drag here'}
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="documentsUpload" className="block text-sm font-semibold text-slate-700 mb-2">
                  Upload any documents (company profile, brochure, references) (optional)
                </label>
                <div className="relative">
                  <input
                    id="documentsUpload"
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    multiple
                    onChange={(e) => handleFileChange(e, 'documents')}
                    className="hidden"
                  />
                  <label
                    htmlFor="documentsUpload"
                    className="flex items-center justify-center gap-2 w-full px-4 py-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-brand-500 cursor-pointer transition"
                  >
                    <FiUpload className="text-slate-500" />
                    <span className="text-slate-600">
                      {files.documents.length > 0 ? `${files.documents.length} file(s) selected` : 'Choose files or drag here'}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6: Website Support Options */}
          <section className="rounded-3xl bg-white/90 backdrop-blur-md ring-1 ring-slate-200 shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-brand-700">Website Support Options</h2>
              <span className="text-sm font-medium text-slate-500">Section 6 of 7</span>
            </div>

            <p className="text-sm text-slate-600 mb-5">
              This helps us recommend the best solution — not a commitment.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Monthly Website Support Options</h3>
                <div className="space-y-3">
                  {[
                    {
                      value: 'Starter – R1,800 per month',
                      label: 'Starter – R1,800 per month',
                      description: 'Professional website, basic updates, online presence & credibility'
                    },
                    {
                      value: 'Growth – R2,300 per month',
                      label: 'Growth – R2,300 per month',
                      description: 'Website with regular updates, improved structure, lead-focused support'
                    },
                    {
                      value: 'Partner – R4,500 per month',
                      label: 'Partner – R4,500 per month',
                      description: 'Full website management, regular updates, ongoing optimisation and support'
                    },
                    {
                      value: 'Not sure – please advise me',
                      label: 'I\'m not sure — please advise me',
                      description: ''
                    }
                  ].map(option => (
                    <label key={option.value} className="block p-4 rounded-xl border-2 border-slate-200 hover:border-brand-500 hover:bg-brand-50/30 cursor-pointer transition">
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="monthlySupportOption"
                          value={option.value}
                          checked={formData.monthlySupportOption === option.value}
                          onChange={handleInputChange}
                          className="mt-0.5 w-5 h-5 border-slate-300 text-brand-600 focus:ring-brand-500"
                        />
                        <div>
                          <div className="font-semibold text-slate-800">{option.label}</div>
                          {option.description && (
                            <div className="text-sm text-slate-600 mt-1">{option.description}</div>
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Once-Off Upfront Payment Option (Alternative)</h3>
                <div className="space-y-3">
                  {[
                    {
                      value: 'R12,500 – Basic website setup',
                      label: 'R12,500 – Basic website setup'
                    },
                    {
                      value: 'R13,700 – Website with additional pages/features',
                      label: 'R13,700 – Website with additional pages/features'
                    },
                    {
                      value: 'R15,000 – Full website build with enhanced setup',
                      label: 'R15,000 – Full website build with enhanced setup'
                    },
                    {
                      value: 'I prefer monthly support',
                      label: 'I prefer monthly support'
                    },
                    {
                      value: 'Not sure upfront – please advise me',
                      label: 'I\'m not sure — please advise me'
                    }
                  ].map(option => (
                    <label key={option.value} className="block p-4 rounded-xl border-2 border-slate-200 hover:border-brand-500 hover:bg-brand-50/30 cursor-pointer transition">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="upfrontPaymentOption"
                          value={option.value}
                          checked={formData.upfrontPaymentOption === option.value}
                          onChange={handleInputChange}
                          className="w-5 h-5 border-slate-300 text-brand-600 focus:ring-brand-500"
                        />
                        <div className="font-semibold text-slate-800">{option.label}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 7: Timing & Expectations */}
          <section className="rounded-3xl bg-white/90 backdrop-blur-md ring-1 ring-slate-200 shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-brand-700">Timing & Expectations</h2>
              <span className="text-sm font-medium text-slate-500">Section 7 of 7</span>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  When would you ideally like your website to be ready?
                </label>
                <div className="space-y-2">
                  {['As soon as possible', 'Within 1 month', 'Flexible'].map(time => (
                    <label key={time} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition">
                      <input
                        type="radio"
                        name="timeline"
                        value={time}
                        required
                        checked={formData.timeline === time}
                        onChange={handleInputChange}
                        className="w-5 h-5 border-slate-300 text-brand-600 focus:ring-brand-500"
                      />
                      <span className="text-slate-700">{time}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-semibold text-slate-700 mb-2">
                  Is there anything important we should know before starting?
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40 transition resize-none"
                  placeholder="Share any additional information that might be helpful..."
                />
              </div>

              <div className="pt-4 border-t border-slate-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="confirmationChecked"
                    required
                    checked={formData.confirmationChecked}
                    onChange={handleInputChange}
                    className="mt-0.5 w-5 h-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-sm text-slate-700">
                    I understand that Embark Digitals will guide me through the process and recommend the best solution for my business.
                  </span>
                </label>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-primary px-8 py-4 text-lg disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Discovery Form'}
            </button>
          </div>

          {/* Error Message */}
          {status === 'error' && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-center">
              <p className="text-red-700">{errorMsg}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
