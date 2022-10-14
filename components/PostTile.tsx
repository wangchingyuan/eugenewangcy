
import { BlogPostT } from "my-custom-types"
import Link from "next/link"
import React from "react"
import { convertToSlug } from "../util/toSlug"


const Component = React.forwardRef( ({ post }:{ post: BlogPostT}, ref) => {
    const slug = convertToSlug(post.title)
    const body = (<Link href={`/blog/${post.slug}`}><a>
        <h1>post:</h1>
        <div className="flex justify-between">
            <h1>{post.title}</h1>
        </div>
        <h3>{post.subtitle}</h3>
    </a></Link>)

    const postTile = ref 
        ? <div ref={ref as React.MutableRefObject<HTMLInputElement>} className="bg-gray-200">{body}</div>
        : <div className="bg-gray-200">{body}</div>
        

    return postTile

})

Component.displayName = 'PostTile'
export default Component