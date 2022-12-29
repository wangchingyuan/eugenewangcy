import { useRouter } from "next/router";
import PostViewer from "../../components/PostViewer";
import { useEffect, useState } from "react";
import CommentManager from "../../components/Comments";
import LoginBtn from "../../components/LoginBtn";
import Link from "next/link";
import { useSession } from "next-auth/react"
import { BlogPostT, PostCommentsT} from "my-custom-types";


export default function BlogPost() {

    const { data: session } = useSession()
    
    const [ postContent, setPostContent ] = useState<BlogPostT>({});
    const [ commentContent, setCommentContent ] = 
        useState<PostCommentsT>({slug:'', comments:[]});

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
        console.log('trying to fetch', `/api/commentsCollection?slug=${postslug}`)
        const res = await fetch(`/api/commentsCollection?slug=${postslug}`)
        const content = await res.json()
        setCommentContent(content[0]) 
        console.log('fetched comments!', res.status, content[0])
    }
    
    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) return
        let { postslug } = router.query
        postslug = typeof postslug ==='string'? postslug : ''
        getPost(postslug)
        getComments(postslug)
    }, [router, router.isReady])
    
    // submit handler for react-hook-form
    const saveComment = async (comm:{comment:string}) => {
        console.log('saving comment...')
        const newComment = {
            ...{slug: router.query.postslug},
            ...{username: session?.user.name}, 
            ...comm,
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
    const deleteComment = async (
            slug:string,
            comment: {username:string, comment:string}, 
            commentIdx:number
        ) => {
        console.log('deleting comment...')
        const res = await fetch(
            `/api/commentsCollection?slug=${slug}&idx=${commentIdx}`, {
            method: 'DELETE',
        })
        console.log('deletedComment!', res)
    }

    return (Object.keys(postContent).length !== 0 ?
        <div className='m-auto'>
            <div className='grid grid-cols-[1fr_minmax(500px,_900px)_1fr]'>
                <div/>
                <PostViewer content={postContent} />
                <div/>
            </div>
            <br/>
            <div className='grid grid-cols-[1fr_minmax(500px,_900px)_1fr]'>
                <div/>
                <CommentManager 
                    content={commentContent} 
                    setContent={setCommentContent} 
                    onSave={saveComment}
                    onDelete={deleteComment}/>
                <div/>
            </div>
            <br/>
            <LoginBtn />
            <br/>
            <Link href={`/editpost/${postContent.slug}`}>[admin edit]</Link>
        </div>
        : <p> post doesn&apos;t exist </p>
    )
}