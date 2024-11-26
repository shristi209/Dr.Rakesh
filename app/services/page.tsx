import ContactPage from '@/components/contact/contact-form'
import { ServicesSection } from '@/components/services/service-section'
import React from 'react'

export default function page() {
  return (
    <div className='md:pt-[21px]' >
        <ServicesSection />
        <ContactPage />
    </div>
  )
}
