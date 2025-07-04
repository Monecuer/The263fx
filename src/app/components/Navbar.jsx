
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 bg-black bg-opacity-70 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">The263Fx</Link>
        <div className="space-x-6 text-sm text-white">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/results">Results</Link>
          <Link href="/academy">Academy</Link>
          <Link href="/login" className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700">Log In</Link>
        </div>
      </div>
    </nav>
  );
}
