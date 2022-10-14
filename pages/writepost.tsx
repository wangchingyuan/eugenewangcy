import { useSession, signIn, signOut } from "next-auth/react"
import LoginBtn from "../components/LoginBtn"
import PostEditor from "../components/PostEditor";

export default function WritePost() {
    const { data: session } = useSession()
    if (!session) return <LoginBtn />

    // submit handler for react-hook-form
    const savePost = async (post:{}) => {
        console.log('saving post...')
        const res = await fetch('/api/postsCollection', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        })
        console.log('savedPost!', res)
    }

    return <>
        <LoginBtn />
        <PostEditor content={{}} onSave={savePost}/>
    </>   
}


