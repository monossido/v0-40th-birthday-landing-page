import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { EasterEggProvider } from '@/contexts/easter-egg-context'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Il Ritrovo dei 40',
  description: 'Un weekend di festa per celebrare i 40 anni - Villa Todeschini, Noventa Padovana - 23/24 Maggio 2025',
  openGraph: {
    title: 'Il Ritrovo dei 40',
    description: 'Un weekend di festa per celebrare i 40 anni',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#C67A5C',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans antialiased">
        <EasterEggProvider>
          {children}
        </EasterEggProvider>
      </body>
    </html>
  )
}
