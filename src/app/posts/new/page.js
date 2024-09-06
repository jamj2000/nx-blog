import Form from "@/components/forms/post.original"
import { newPost } from "@/lib/actions"

function page() {
  return (
    <div>
        <Form action={newPost} title='Crear post'  />
    </div>
  )
}

export default page