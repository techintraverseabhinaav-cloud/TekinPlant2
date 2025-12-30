import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from '@clerk/nextjs'
import SyncUserToSupabase from '../components/SyncUserToSupabase'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TEKINPLANT - Industry Training Portal",
  description: "Connect with leading companies, master cutting-edge technologies, and accelerate your professional growth with our comprehensive training programs.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
          <SyncUserToSupabase />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
