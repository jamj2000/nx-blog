'use client'
import Button from "../button"
import Imagen from "../imagen"
// import Tiptap from "@/components/Tiptap.new"
import { useState, useEffect } from 'react';


import dynamic from 'next/dynamic'

const Tiptap = dynamic(() => import('@/components/Tiptap.old', { ssr: false}), {
    loading: () => <p>Loading...</p>,
})

function PostForm({ action, post, disabled, title }) {
    const [titulo, setTitulo] = useState('')
    const [autor, setAutor] = useState('')
    const [texto, setTexto] = useState('')
    const [slug, setSlug] = useState('')

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setTitulo(post.title)
        setAutor(post.author)
        setTexto(post.post)
        setSlug(post.slug)
        setIsLoaded(true)
    }, [post.title, post.author, post.slug, post.post])


    return (
        <form action={action} className="w-full max-w-full px-4">
            <Button title={title} className="font-bold w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700 hover:text-gray-100" />

            <input type='hidden' name='id' value={post?.id} />
            <fieldset disabled={disabled} className="space-y-4">

                <div className='flex flex-col md:flex-row md:gap-10'>
                    <Imagen imgUrl={post?.image || '/blog-logo.png'} className="w-full md:w-1/3 object-cover" />

                    <div className='w-full md:w-2/3'>

                        <label className="flex flex-col md:flex-row items-center md:space-x-4">
                            <span className="font-bold w-full md:w-1/4">Título</span>
                            <input
                                type='text'
                                name='title'
                                value={titulo}
                                onChange={e => setTitulo(e.target.value)}
                                placeholder='Título'
                                className="w-full md:w-3/4 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                            />
                        </label>

                        <label className="flex flex-col md:flex-row items-center md:space-x-4">
                            <span className="font-bold w-full md:w-1/4">Autor/a</span>
                            <input
                                type='text'
                                name='author'
                                value={autor}
                                onChange={e => setAutor(e.target.value)}
                                placeholder='Autor/a'
                                className="w-full md:w-3/4 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                            />
                        </label>


                        <div className="mt-4 flex items-center md:space-x-4">
                            <p>
                                <span className="font-bold">Vistas: </span>
                                <span>{post?.views}</span>
                            </p>
                        </div>


                    </div>
                </div>


                {isLoaded &&
                    <div className='mt-30'>
                           {/* <Tiptap content={texto} setContent={ setTexto } /> */}
                        <Tiptap content={texto} /> 
                        <input type="hidden" name='post' value={texto} />
                        {/* {texto} */}
                    </div>
                }


                <div className="hidden">
                    <label className="flex flex-col md:flex-row items-center md:space-x-4">
                        <span className="font-bold w-full md:w-1/4">Slug</span>
                        <input
                            type='text'
                            id='slug'
                            name='slug'
                            placeholder='Slug'
                            value={slug}
                            onChange={e => setSlug(e.target.value)}
                            className="w-full md:w-3/4 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                        />
                    </label>
                </div>
            </fieldset>
        </form>

    )
}


export default PostForm