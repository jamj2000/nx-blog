import Link from 'next/link'
import { auth } from "@/auth"
import { FaPlus } from "react-icons/fa6";
// import Post from '@/components/Post'
// import PaginationControls from '@/components/PaginationControls'
// import { PAGE, PER_PAGE } from '@/lib/pagination'
// import { FaPen, FaTrash, FaArrowUpRightFromSquare } from "react-icons/fa6";
// import { getPostsWithCategory, getAllPosts, editPost, deletePost } from '@/lib/actions'
// import Modal from '@/components/Modal';
// import Form from '@/components/forms/post';
import { Suspense } from 'react';
import PostList from '@/components/PostList';
import Spinner from '@/components/spinner';


export default async function PostHome({ searchParams }) {
    const session = await auth()

    // const page = Number(searchParams['page'] ?? PAGE)
    // const per_page = Number(searchParams['per_page'] ?? PER_PAGE)
    // const category = searchParams['category'] ?? ''

    // let posts = []
    // if (category) {
    //     posts = await getPostsWithCategory(category)
    // } else {
    //     posts = await getAllPosts(page)
    // }

    // // mocked, skipped and limited in the real app
    // const start = (page - 1) * per_page // 0, 5, 10 ...
    // const end = start + per_page    // 5, 10, 15 ...

    // let entries = []

    // if (start >= 0 && start < posts.length)   // check limits
    //     entries = posts.slice(start, end)     // get posts slice

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Posts</h1>
            <div className='flex flex-col gap-4 justify-center'>
                {session?.user?.role === 'ADMIN' &&
                    <Link
                        className='bg-green-400 p-4 rounded-full self-end hover:shadow-md'
                        title="Nuevo post"
                        href="/posts/new">
                        <FaPlus size='1rem' color='white' />
                    </Link>
                }
                <Suspense fallback={<Spinner /> }>
                    <PostList searchParams={searchParams} />
                </Suspense>


            </div>
        </div>
    )
}
