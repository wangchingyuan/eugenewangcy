import { useRouter } from "next/router";
import PostViewer from "../../components/PostViewer";
import { useEffect, useState } from "react";
import CommentManager from "../../components/Comments";
import LoginBtn from "../../components/LoginBtn";
import Link from "next/link";
import { useSession } from "next-auth/react"


export default function viewPost() {

    const { data: session } = useSession()
    
    const [ postContent, setPostContent ] = useState({});
    const [ commentContent, setCommentContent ] = useState([])

    const getPost = async (postslug:string) => {
        const res = await fetch(`/api/postsCollection?slug=${postslug}`)
        const content = await res.json()
        if (content.length === 0) {
            setPostContent({})
        } else {
            content[0].tags = content[0].tags?.toString()
            setPostContent(content[0])
        }
        console.log('fetched a post!', res.status, content[0])
    }

    const getComments = async (postslug:string) => {
        const res = await fetch(`/api/commentsCollection?slug=${postslug}`)
        const content = await res.json()
        setCommentContent(content[0].comments) 
        console.log('fetched comments!', res.status, content[0].comments)
    }
    
    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) return
        const { postslug } = router.query
        getPost(postslug)
        getComments(postslug)
    }, [router.isReady])
    
    // submit handler for react-hook-form
    const saveComment = async (comment:{}) => {
        console.log('saving comment...')
        const newComment = {
            ...{slug: router.query.postslug},
            ...{username: session.user.name}, 
            ...comment,
        }
        const res = await fetch('/api/commentsCollection', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newComment),
        })
        console.log('savedComment!', res)
    }

    return (<>
        <LoginBtn />
        <br/>
        <PostViewer content={postContent} />
        <br/>
        <CommentManager 
            content={commentContent} 
            setContent={setCommentContent} 
            onSave={saveComment}/>
        <br/>
        <Link href={`/editpost/${postContent.slug}`}>admin edit</Link>
    </>)
}