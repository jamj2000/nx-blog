import Link from 'next/link'
import { auth } from "@/auth"

export const dynamic = 'force-dynamic'

export default async function Home() {
    const session = await auth()

    return (
        <main className="flex-grow grid place-content-center bg-cover bg-slate-50" >
            {/* <div className="text-center bg-gr p-8 rounded-lg shadow-md"> */}
                <h1 className="text-3xl font-bold">Blog</h1>
                {session && 'Sesión iniciada por ' + session?.user.name}

                <div className="flex flex-col gap-4 mt-10 text-3xl">
                    <Link href="/categories" className="text-blue-500 hover:underline">
                        Listado de categorías
                    </Link>
                    <Link href="/posts" className="text-blue-500 hover:underline">
                        Listado de posts
                    </Link>
                </div>
            {/* </div> */}
        </main>
    )
}
