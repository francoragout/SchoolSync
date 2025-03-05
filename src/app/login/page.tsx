import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-muted p-6 md:p-10">
      <div className="absolute inset-0">
        <Image 
          src="/classroom.jpg" 
          alt="Classroom" 
          layout="fill" 
          objectFit="cover" 
          quality={100}
        />
      </div>
      <div className="relative z-10 flex w-full max-w-sm flex-col gap-6 bg-white bg-opacity-75 p-6 rounded-lg">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          SchoolSync
        </a>
        <LoginForm />
      </div>
    </div>
  )
}