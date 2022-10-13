import { useSession, signIn, signOut } from "next-auth/react"
import LoginBtn from "../../components/LoginBtn"
import { useRouter } from "next/router";
import PostEditor from "../../components/PostEditor";
import { useEffect, useState } from "react";
import CommentEditor from "../../components/Comments";


export default function editPost() {
    
    const { data: session } = useSession()

    const [postContent, setPostContent] = useState({});

    const getPost = async (postslug:string) => {
        const res = await fetch(`/api/postsCollection?slug=${postslug}`)
        const content = await res.json()
        if (content.length === 0) {
            setPostContent({})
        } else {
            content[0].tags = content[0].tags?.toString()
            setPostContent(content[0])
        }
        console.log('gotPost!', res, content)
    }
    
    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) return
        const { postslug } = router.query
        console.log('router.uqery', postslug)
        getPost(postslug)
    }, [router.isReady])
    

    // submit handler for react-hook-form
    const savePost = async (post:{}) => {
        console.log('saving post...')
        const res = await fetch('/api/postsCollection', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        })
        console.log('savedPost!', res)
    }
    
    if (!session) {
        return <LoginBtn />
    } else if (session.user.role === 'admin') {
        return (<>
            <LoginBtn />
            <br/>
            <h1> editing published post {} </h1>
            <PostEditor content={postContent} onSave={savePost}/>
        </>)
    } else {
        const { postslug } = router.query
        router.push(`/redirect?link=/blog/${postslug}`)
    }
}