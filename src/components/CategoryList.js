import Category from '@/components/Category';
import PaginationControls from '@/components/PaginationControls'
import { PAGE, PER_PAGE } from '@/lib/pagination'
import { getCategories } from '@/lib/actions'




async function CategoryList({ searchParams }) {
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

            {entries.map((category) =>
                <Category key={category.id} category={category} />
            )}

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