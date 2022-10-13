import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { convertToSlug } from '../util/toSlug';


export default function PostEditor({ content, onSave }) {

    //todo: if slug don't exist redirect
    const [ slugState, setSlugState ] = useState('')
    const [ preview, setPreview ] = useState(false);
    const { register, handleSubmit, reset, watch } = useForm({ defaultValues:content, mode: 'onChange' });
  
    useEffect(() => {
        if (content) {
            reset(content);
            setSlugState(content.slug)
        }
    }, [content]);

    const updatePost = async ( updatedContent ) => {
        if (updatedContent.title){
            setSlugState(convertToSlug(updatedContent.title))
            await onSave(updatedContent);
        }
    }

    return (<>
        <form onSubmit={handleSubmit(updatePost)}>
            {preview && (<div className="card">
                <ReactMarkdown>{watch('title')}</ReactMarkdown>
                <ReactMarkdown>{watch('body')}</ReactMarkdown>
            </div>)}
    
            {!preview && ( <div className="flex flex-col">
                <p>title:</p>
                <textarea {...register('title')}></textarea>
                <br/>
                <p>slug: {convertToSlug(watch('title'))}</p>
                <br/>
                <p>subtitle:</p>
                <textarea {...register('subtitle')}></textarea>
                <br/>
                <p>body:</p>
                <textarea {...register('body')}></textarea>
                <br/>
                <p>tags: (seperate with commas)</p>
                <textarea {...register('tags')}></textarea>
                <br/>
                <p>references:</p>
                <textarea {...register('references')}></textarea>
                <button type="submit" className="btn-green">
                    Save Changes
                </button>
            </div>)}

        </form>
        <div className="flex justify-between">
            <button onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
            <button><Link href={`/blog/${slugState}`}>Live View (go back)</Link></button>
        </div>
    </>);
  }