"use client"

import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-20" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">TekInPlant</h3>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Industry-leading training programs to accelerate your professional growth.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#c084fc' }} />
                <div className="space-y-1">
                  <p className="text-white/90 text-sm font-medium">+91 9860970798</p>
                  <p className="text-white/60 text-sm">Mon-Fri, 9:00 AM - 6:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#c084fc' }} />
                <div className="space-y-1">
                  <p className="text-white/90 text-sm font-medium">info@trainin.com</p>
                  <p className="text-white/60 text-sm">Response within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Address & Hours */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Location</h3>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#c084fc' }} />
              <div className="space-y-1">
                <p className="text-white/90 text-sm leading-relaxed">
                  TEKINPLANT Headquarters<br />
                  Tech Park, Building A<br />
                  Bangalore, Karnataka 560001<br />
                  India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <p className="text-white/60 text-sm text-center">
            © {currentYear} TekInPlant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

