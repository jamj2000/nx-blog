import Link from 'next/link'
import { auth } from "@/auth"
import { FaPlus } from "react-icons/fa6";
import Post from '@/components/Post'
import PaginationControls from '@/components/PaginationControls'
import { PAGE, PER_PAGE } from '@/lib/pagination'
import { FaPen, FaTrash, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { getPostsWithCategory, getAllPosts, editPost, deletePost } from '@/lib/actions'
import Modal from '@/components/Modal';
import Form from '@/components/forms/post.original';
import { Suspense } from 'react';
import Spinner from '@/components/spinner';
import PostList from '@/components/PostList';

export default async function PostHome({ searchParams }) {
    const session = await auth()

    const page = Number(searchParams['page'] ?? PAGE)
    const per_page = Number(searchParams['per_page'] ?? PER_PAGE)
    const category = searchParams['category'] ?? ''

    let posts = []
    if (category) {
        posts = await getPostsWithCategory(category)
    } else {
        posts = await getAllPosts(page)
    }

    // mocked, skipped and limited in the real app
    const start = (page - 1) * per_page // 0, 5, 10 ...
    const end = start + per_page    // 5, 10, 15 ...

    let entries = []

    if (start >= 0 && start < posts.length)   // check limits
        entries = posts.slice(start, end)     // get posts slice

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
                {/* <Suspense fallback={<Spinner /> }>
                    <PostList searchParams={searchParams} />
                </Suspense> */}

                 <PaginationControls
                    currentPage={page}
                    hasNextPage={end < posts.length}
                    hasPrevPage={start > 0}
                    total={posts.length}
                />
                {entries.map((post) => (
                    <Post key={post.id} post={post}>
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
                                className='bg-yellow-400 p-4 rounded-full self-end hover:shadow-md'>

                                <Form action={editPost} disabled={false} title="Actualizar este post" post={post} />
                            </Modal>

                            <Modal icon={<FaTrash size='1rem' color='white' />}
                                className='bg-red-400 p-4 rounded-full self-end hover:shadow-md'>

                                <Form action={deletePost} disabled={true} title="Eliminar este post" post={post} />
                            </Modal>
                           
                            </div>
                        }
                    </Post>
                ))}
                <PaginationControls
                    currentPage={page}
                    hasNextPage={end < posts.length}
                    hasPrevPage={start > 0}
                    total={posts.length}
                /> 


            </div>
        </div>
    )
}
