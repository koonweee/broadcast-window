import { useSession, signIn, signOut } from "next-auth/react"
export function LoginButton () {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <span> {session ? "Signed in as " + session.user?.email : "Not signed in"} </span>
      <button onClick={() => session ? signOut() : signIn()} className="bg-blue-500 p-2 rounded-md">
        {session ? "Sign out" : "Sign in"}
      </button>
    </div>
  )
}
