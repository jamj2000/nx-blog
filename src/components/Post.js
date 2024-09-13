import Link from "next/link"
import Modal from '@/components/Modal'
import { FaArrowUpRightFromSquare, FaPen, FaTrash } from "react-icons/fa6"
import { editPost, deletePost } from "@/lib/actions"
import { auth } from '@/auth'
import Form from "@/components/forms/post"


async function post({ post }) {
    const session = await auth()

    return (
        <div className='flex justify-between p-4 rounded-md hover:shadow-md' >
            <div className="flex flex-col items-start">
                <Link href={`/posts/${post.slug}`} className="text-left">
                    <div>
                        <b>{post.title}</b>
                        <p className="text-gray-500 text-xs italic">Autor/a: {post.author}.</p>
                        <p className="text-gray-500 text-xs italic">Creado el {new Date(post.created).toLocaleString()}</p>
                        <p className="text-gray-500 text-xs italic">Vistas: {post.views}</p>
                    </div>
                </Link>
            </div>
            <div className="flex gap-1 justify-center">

                {session?.user?.role === 'ADMIN' &&
                    <div className='flex gap-1 justify-center'>
                        {post.is_draft &&
                            <Link
                                className='bg-blue-400 p-4 rounded-full self-end hover:shadow-md'
                                title='Publicar post'
                                href={{ pathname: '/posts/edit', query: { id: post.id } }}>
                                <FaArrowUpRightFromSquare size='1rem' color='white' />
                            </Link>
                        }

                        <Modal icon={<FaPen size='1rem' color='white' />}
                            className='cursor-pointer flex gap-2 items-center text-white bg-yellow-400 p-4 rounded-full self-end hover:shadow-md'>

                            <Form action={editPost} post={post} disabled={false} title="Actualizar este post" />
                        </Modal>

                        <Modal icon={<FaTrash size='1rem' color='white' />}
                            className='cursor-pointer flex gap-2 items-center text-white bg-red-400 p-4 rounded-full self-end hover:shadow-md'>

                            <Form action={deletePost} post={post} disabled={true} title="Eliminar este post" />
                        </Modal>
                    </div>
                }


                {/* {children} */}
            </div>
        </div>
    )
}

export default post