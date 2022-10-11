import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.data} <br />
        here~
        {process.env.GITHUB_ID}
        ~and here
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in
      <button onClick={() => signIn()}>Sign in to write posts</button>
    </>
  )
}