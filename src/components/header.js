'use client'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { signIn, signOut } from "next-auth/react"
import { useState } from 'react';
import { LogIn, LogOut } from 'lucide-react';




export default function Header({ session }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)


  return (
    <nav className="bg-white shadow-md fixed w-full">

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/" className="flex items-center py-4 px-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src='/blog-logo.png' className="h-8 w-auto" alt="Logo" />
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/posts" className="py-4 px-2 text-gray-500 hover:text-blue-400 transition duration-300">Posts</Link>
            <Link href="/categories" className="py-4 px-2 text-gray-500 hover:text-blue-400 transition duration-300">Categorías</Link>
            {!session?.user ? (
              <Link href="/auth/login" className="inline-flex items-center px-4 py-2 bg-white text-gray-800  hover:text-blue-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400">
                <LogIn className='p-1' /> Iniciar sesión
              </Link>
            ) : (
              // <Link href="/auth/logout" className="inline-flex items-center px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400">
              //   Cerrar sesión
              // </Link>
              <button
                title={`Sesión iniciada por ${session.user.name}`}
                className='inline-flex items-center px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100  hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-400'
                onClick={() => signOut()}>
                <LogOut className='p-1' /> Cerrar sesión
              </button>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6 text-gray-500" /> : <Menu className="w-6 h-6 text-gray-500" />}
            </button>
          </div>
        </div>
      </div>


      {isMenuOpen && (
        <div className="mobile-menu md:hidden p-4 text-md flex flex-col">
          <Link href="/posts" className="block py-2 px-4 hover:bg-blue-400 hover:text-white transition duration-300">Posts</Link>
          <Link href="/categories" className="block py-2 px-4 hover:bg-blue-400 hover:text-white transition duration-300">Categorías</Link>
          {!session?.user ? (
            <Link href="/auth/login" className="inline-flex items-center self-end px-4 py-2 bg-white text-gray-800 hover:text-blue-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400">
              <LogIn className='p-1' /> Iniciar sesión
            </Link>
          ) : (
            // <Link href="/auth/logout" className="inline-flex items-center self-end px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400">
            //   Cerrar sesión
            // </Link>
            <button
              title={`Sesión iniciada por ${session.user.name}`}
              className='inline-flex items-center self-end px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100  hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-400'
              onClick={() => signOut()}>
              <LogOut className='p-1' /> Cerrar sesión
            </button>
          )}
        </div>
      )}

    </nav>
  )
}