import './globals.css'
import { Roboto } from 'next/font/google'
import Script from 'next/script'


const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'Stock Screener',
  description: 'Stock Screener powered by IEX Cloud',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script src="https://js.pusher.com/8.0.1/pusher.min.js" />
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
