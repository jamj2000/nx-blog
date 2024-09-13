import { logout } from "@/lib/actions"
import { redirect } from "next/navigation"
import { auth } from "@/auth"

async function page() {
  const sesion = await auth()

  if (sesion) {
    return (
        <form>
          <button formAction={logout} className='logout flex gap-2 items-center'>
            <img src="/logout.svg" alt="Exit" /> 
            <span className="text-2xl"> Cerrar sesión</span>
          </button>
        </form>
    )
  }
  else {
    redirect('/auth/login')
  }
}

export default page