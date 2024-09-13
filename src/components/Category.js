import Link from "next/link"
import { auth } from '@/auth'
import Modal from "./Modal"
import { FaPen, FaTrash } from "react-icons/fa6"

async function category({ children, category }) {
    const session = await auth()

    return (
        <div className='flex justify-between p-4 rounded-md hover:shadow-md' >
            <div className="flex flex-col items-start">

                <Link href={`/categories/${category.slug}`} className="text-left">
                    <div>
                        <b>{category.name}</b>
                    </div>
                </Link>
            </div>
            <div className="flex gap-1 justify-center">
                {session?.user?.role === 'ADMIN' &&
                    <div className='flex gap-1 justify-end'>
                        <Link
                            className='bg-yellow-400 p-4 rounded-full self-end hover:shadow-md'
                            title='Editar categoría'
                            href={{ pathname: '/categories/edit', query: { id: category.id } }}>
                            <FaPen size='1rem' color='white' />
                        </Link>
                        <Modal data={category}
                            icon={<FaTrash size='1rem' color='white' />}
                            className='bg-red-400 p-4 rounded-full self-end hover:shadow-md'>
                            <h1>{category.name}</h1>
                            <h1>{category.slug}</h1>
                        </Modal>
                    </div>
                }
            </div>
        </div>
    )
}

export default category