import Link from 'next/link'
import { auth } from "@/auth"
import { FaPlus } from "react-icons/fa6";
import PostList from '@/components/PostList'
import { Suspense } from 'react';
import Spinner from '@/components/spinner';


export default async function PostHome({ searchParams }) {
    const session = await auth()

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
