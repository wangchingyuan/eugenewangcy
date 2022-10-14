import { useSession, signIn, signOut } from "next-auth/react"
import LoginBtn from "../../components/LoginBtn"
import { useRouter } from "next/router";
import PostEditor from "../../components/PostEditor";
import { useEffect, useState } from "react";
import CommentEditor from "../../components/Comments";
import { BlogPostT } from "my-custom-types";


export default function BlogPostEdit() {
    
    const { data: session } = useSession()

    const [postContent, setPostContent] = useState({});

    const getPost = async (postslug:string) => {
        const res = await fetch(
            `/api/postsCollection?slug=${postslug}`, 
            {method:'GET'}
        )
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
        getPost(typeof postslug==='string'?postslug:'')
    }, [router, router.isReady])
    

    // submit handler for react-hook-form
    const savePost = async (post:BlogPostT) => {
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

    //callback for delete button
    const deletePost = async () => {
        console.log('deleting post...')
        const { postslug } = router.query
        const res = await fetch(
            `/api/postsCollection?slug=${postslug}`, 
            {method:'DELETE'}
        )
        console.log('deletedPost!', res);
        alert(`post deleted: ${postslug}`);
        router.push('/blog');
    }
    
    if (!session) {
        return <LoginBtn />
    } else if (session.user.role === 'admin') {
        return (<>
            <LoginBtn />
            <br/>
            <h1> editing published post {} </h1>
            <PostEditor content={postContent} onSave={savePost} onDelete={deletePost}/>
        </>)
    } else {
        const { postslug } = router.query
        router.push(`/redirect?link=/blog/${postslug}`)
    }
}