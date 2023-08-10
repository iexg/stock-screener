import Image from 'next/image'
import StockScreener from '@/components/StockScreener'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className='flex flex-col h-screen'>
     <main className="flex flex-col items-center justify-around p-16 flex-grow">
      <StockScreener/>
    </main>
    <Footer/>
    </div>
  )
}
