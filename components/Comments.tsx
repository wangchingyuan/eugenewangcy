import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { convertToSlug } from '../util/toSlug';
import { useSession } from "next-auth/react"


export default function CommentManager({ content, setContent, onSave }) {

    const { data: session } = useSession()

    const { register, handleSubmit, formState, reset } = useForm({mode: 'onChange' });
  
    const updateComment = async ( newComment ) => {
        // if text box not empty?
        if (newComment){
            // setState to instantly reflect new comment
            setContent(prev => [
                ...prev, 
                ...[{
                    ...{username: session.user.name}, 
                    ...newComment,
                }]
            ])
            onSave(newComment);
        }
    }
    useEffect(()=>{
        reset({comment:''});
    },[content])

    const oldComments = content.map((c) => <p>{c.username}: {c.comment}</p>)
    return (<>
        <p className="text-center">Comments:</p>
        {oldComments}
        <form onSubmit={handleSubmit(updateComment)}>
            <div className="flex flex-col">
                <textarea {...register('comment')}></textarea>
                <button type="submit" className="btn-green">
                    Save Comment
                </button>
            </div>

        </form>
    </>);
  }