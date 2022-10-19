import { BlogPostT } from 'my-custom-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { convertToSlug } from '../util/toSlug';


export default function PostEditor({ 
    content, onSave, onDelete 
} : {
    content: BlogPostT, 
    onSave: (param:Object)=>Promise<string>,
    onDelete: ()=>void,
}) {

    //todo: if slug don't exist redirect
    const router = useRouter();
    const [ slugState, setSlugState ] = useState('')
    const [ preview, setPreview ] = useState(false);
    const { register, handleSubmit, reset, watch } = useForm({ defaultValues:content, mode: 'onChange' });
  
    useEffect(() => {
        if (content) {
            reset(content);
            setSlugState(content.slug? content.slug : "")
        }
    }, [content, reset]);

    //
    const updatePost = async ( updatedContent:BlogPostT ) => {
        if (updatedContent.title){
            const newSlug = convertToSlug(updatedContent.title)
            setSlugState(newSlug)
            const res = await onSave(updatedContent);
            if (res === 'isAdmin') {
                router.push(`/editpost/${newSlug}`)
                alert('Changes saved!');
            }
        } else {
            alert('Title required')
        }
    }

    const [ confirmed, setConfirmed ] = useState(false)
    const onDeleteConfirm = async () => {
        if (confirmed) onDelete();
    }

    const textareaCN ='border border-black p-1'


    return (<>
        <form onSubmit={handleSubmit(updatePost)}>
            {preview && (<div className="prose">
                <p className='text-4xl font-bold'>{watch('title') || ''}</p>
                <ReactMarkdown>{watch('body') || ''}</ReactMarkdown>
                <br/>
            </div>)}
    
            {!preview && ( <div className="flex flex-col">
                <p>Title:</p>
                <textarea className={textareaCN} {...register('title')}></textarea>
                
                <p >URL Slug: {convertToSlug(watch('title'))}</p>
                <br/>
                <p>Subtitle:</p>
                <textarea className={textareaCN} {...register('subtitle')}></textarea>
                <br/>
                <p>Body:</p>
                <textarea className={textareaCN} {...register('body')}></textarea>
                <br/>
                <p>Tags: (seperate with commas)</p>
                <textarea className={textareaCN} {...register('tags')}></textarea>
                <br/>
                <p>References:</p>
                <textarea className={textareaCN} {...register('references')}></textarea>
                <br/>
                <button type="submit" className="">
                    [Save Changes]
                </button>
            </div>)}

        </form>
        <div className="flex justify-between">
            <button onClick={() => setPreview(!preview)}>{preview ? '[Edit Post]' : '[Preview]'}</button>
            <button><Link href={`/blog/${slugState}`}>[Live View (go back)]</Link></button>
        </div>
        <br/>
        <div className="flex justify-start absolute bottom-0">
            <label>
                <input type="checkbox" onClick={()=>{setConfirmed(prev=>!prev)}}/>
                delete?
            </label>
            <button onClick={()=>onDeleteConfirm()}>[CONFIRM]</button>
        </div>
    </>);
  }