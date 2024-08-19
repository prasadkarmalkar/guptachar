import Link from 'next/link'

function Header() {
  return (
    <header className='sticky top-0 text-center text-xl py-5 border-gray-800 border-b bg-black'>
        <Link href={'/'}>Guptachar</Link>
    </header>
  )
}

export default Header