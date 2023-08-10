import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray py-4 flex items-center justify-center text-white">
        <div className="flex items-center">
        <span className="mr-2">
        Powered by
        </span>
        <Image src="/icon-color.svg" alt="IEX Cloud logo" width={24} height={24}/>
        <span className='ml-2'>IEX Cloud</span>
        </div>

    </footer>
  )
}

export default Footer;
