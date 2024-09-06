import Link from 'next/link';
import PaginationControls from '@/components/PaginationControls'
import { PAGE, PER_PAGE } from '@/lib/pagination'
import { FaPen, FaTrash } from "react-icons/fa6";
import { getCategories } from '@/lib/actions'
import Category from '@/components/Category';
import { auth } from '@/auth'
import Modal from './Modal';


async function CategoryList({ searchParams }) {
    const session = await auth()

    const page = Number(searchParams['page'] ?? PAGE)
    const per_page = Number(searchParams['per_page'] ?? PER_PAGE)

    const categories = await getCategories()

    // Calcular el índice de inicio y final
    const start = (page - 1) * per_page
    const end = start + per_page

    // Obtener la porción de categorías según la página
    let entries = []

    if (start >= 0 && start < categories.length) {
        entries = categories.slice(start, end)
    }

    return (

        <>
            <PaginationControls
                currentPage={page}
                hasNextPage={end < categories.length}
                hasPrevPage={start > 0}
                total={categories.length}
            />
            {entries.map((category) => (
                <Category key={category.id} category={category}>
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
                            {/* < Link
                                className='bg-red-400 p-4 rounded-full self-end hover:shadow-md'
                                title='Eliminar categoría'
                                href={{ pathname: '/categories/delete', query: { id: category.id } }}>
                                <FaTrash size='1rem' color='white' />
                            </Link> */}
                        </div>
                    }
                </Category>
            ))}
            <PaginationControls
                currentPage={page}
                hasNextPage={end < categories.length}
                hasPrevPage={start > 0}
                total={categories.length}
            />
        </>


    )
}

export default CategoryList