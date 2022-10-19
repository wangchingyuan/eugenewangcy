import { getSession, useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  //const session = await getSession({ req })
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="flex justify-between">
        Signed in as {session.user.name} with {session.user.role} role
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (<div className="text-center">
    <button onClick={() => signIn()}>
      <u>Sign in</u> to comment or edit.
    </button>
  </div>
    
  )
}
