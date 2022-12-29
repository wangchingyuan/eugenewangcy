import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from "next-auth/react"
import { PostCommentsT } from 'my-custom-types';


export default function CommentManager(
    { 
        content, setContent, onSave, onDelete 
    } : { 
        content: PostCommentsT, 
        setContent: React.Dispatch<React.SetStateAction<PostCommentsT>>
        onSave: (param:{comment:string})=>{}
        onDelete: (
            slug:string,
            comment: {username:string, comment:string}, 
            commentIdx:number)=>{}
    }) {

    const { data: session } = useSession()

    const { 
        register, 
        handleSubmit, 
        formState, 
        reset 
    } = useForm({ defaultValues:{comment:''}, mode: 'onChange' });
  
    const updateComment = async ( 
        newComment: {comment:string} 
    ) => {
        // if comment isnt empty string and session is valid
        if (newComment.comment && session?.user?.name){
            const sessUser = session.user.name ;
            // setState to instantly reflect new comment
            setContent((prev: PostCommentsT) => {
                return {
                    slug:prev.slug,
                    comments:[
                        ...prev.comments,
                        ...[{
                            ...{username: sessUser}, 
                            ...newComment,
                        }]
                    ]
                }
            })
            onSave(newComment);
        } else {
            alert('Sign in to comment')
        }
    }
    const deleteComment = async (
        slug:string,
        thisComment: {username:string, comment:string}, 
        commentIdx:number 
    ) => {
        console.log('deleteComment called:', slug, thisComment, commentIdx)
        // setState to instantly reflect new comment
        setContent((prev: PostCommentsT) => {
            if (
                prev.comments[commentIdx] && 
                prev.comments[commentIdx].username === session?.user?.name
            ) {
                const left = prev.comments.slice(0,commentIdx)
                const right = commentIdx+1 < prev.comments.length
                    ? prev.comments.slice( commentIdx+1, prev.comments.length)
                    : []
                return {slug:prev.slug, comments:[...left, ...right]}
            }
            return prev
        })
        onDelete(slug, thisComment, commentIdx);
    }

    useEffect(()=>{
        reset({comment:''});
    },[content, reset])

    
    const oldComments = content?.comments?.map((c,i) => {
        if (c.username === session?.user.name) {
            return (<p key={i} className='prose m-auto'>
                {c.username}: {c.comment} 
                <button onClick={()=>deleteComment(content.slug, c, i)}>
                    [deleteMyComment]
                </button>
            </p>)
        }
        return <p key={i} className='prose m-auto'>{c.username}: {c.comment}</p>
    })
    return (<div>
        <p className="prose m-auto text-center text-xl font-semibold">Comments:</p>
        {oldComments}
        <div className='prose m-auto'>
        <form onSubmit={handleSubmit(updateComment) }>
            <div className='flex flex-col'>
            <textarea {...register('comment')}></textarea>
            <button type="submit" className="btn-green">
                [Save Comment]
            </button>
            </div>
        </form>
        </div>
        
    </div>);
  }