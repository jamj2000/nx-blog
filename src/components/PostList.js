
import Post from '@/components/Post'
import PaginationControls from '@/components/PaginationControls'
import { PAGE, PER_PAGE } from '@/lib/pagination'
import {  getPaginatedPosts } from '@/lib/actions'
// import { auth } from "@/auth"


// import dynamic from 'next/dynamic'
 
// const Form = dynamic(() => import('@/components/Post'), { ssr: true })


async function PostList({ searchParams}) {
    // const session = await auth()

    const page = Number(searchParams['page'] ?? PAGE)
    const per_page = Number(searchParams['per_page'] ?? PER_PAGE)
    const category = searchParams['category'] ?? ''

    // mocked, skipped and limited in the real app
    const start = (page - 1) * per_page // 0, 5, 10 ...
    const end = start + per_page    // 5, 10, 15 ...

    const { posts, total}  = await getPaginatedPosts({ orderBy: {created: 'desc'}, start, end})

    // let entries = []

    // if (start >= 0 && start < total)   // check limits
    //     entries = posts.slice(start, end)     // get posts slice

    return (
        <>
            <PaginationControls
                currentPage={page}
                hasNextPage={end < total}
                hasPrevPage={start > 0}
                total={total}
            />

            {posts.map((post) =>
                <Post key={post.id} post={post} />
            )}

            <PaginationControls
                currentPage={page}
                hasNextPage={end < total}
                hasPrevPage={start > 0}
                total={total}
            />
        </>
    )
}

export default PostList