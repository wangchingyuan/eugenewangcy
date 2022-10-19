import { BlogPostT } from "my-custom-types";
import { useSession, signIn, signOut } from "next-auth/react"
import Router, { useRouter } from "next/router";
import LoginBtn from "../components/LoginBtn"
import PostEditor from "../components/PostEditor";
import { convertToSlug } from "../util/toSlug";

export default function WritePost() {
    const { data: session } = useSession()
    const router = useRouter();
    if (!session) return <LoginBtn />

    // submit handler for react-hook-form
    const savePost = async (post:BlogPostT) => {
        console.log('saving post...')
        const res = await fetch('/api/postsCollection', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        })
        console.log('savedPost!', res)
        router.push(`/blog/${convertToSlug(post.title)}`)
        return 'isAdmin'
    }

    const nonAdminAlert = async (post:BlogPostT) => {
        alert('Only admin can write new post')
        return 'notAdmin'
    }
    

    if (!session) {
        return <>
            <LoginBtn />
        </>
    } else if (session.user.role === 'admin') {
        return (<>
            <LoginBtn />
            <br/>
            <p className="text-xl font-bold"> Writing a new post ... {} </p>
            <br/>
            <PostEditor content={{}} onSave={savePost} onDelete={()=>{router.push('/blog')}}/>
        </> )
    } else {
        return (<>
            <LoginBtn />
            <br/>
            <p> Admin role required to save changes </p>
            <p className="text-xl font-bold"> Writing a new post ... {} </p>
            <br/>
            <PostEditor content={{}} onSave={nonAdminAlert} onDelete={()=>{router.push('/blog')}}/>
        </> )
    }
}


