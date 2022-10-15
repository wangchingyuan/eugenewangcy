
import { BlogPostT } from "my-custom-types"
import Link from "next/link"
import React, { useContext } from "react"
import { classNameByTheme } from "../util/themedClassName"
import { convertToSlug } from "../util/toSlug"
import {ThemeContext} from "./ThemeContext"


const Component = React.forwardRef( ({ post }:{ post: BlogPostT}, ref) => {
    const {themeState} = useContext(ThemeContext);
    const slug = convertToSlug(post.title)

    let tileClassName = classNameByTheme(
        themeState,
        'p-2 rounded-md bg-zinc-600',
        'p-2 rounded-md bg-gray-400',
        'p-2 rounded-md bg-white'
    )

    const body = (<Link href={`/blog/${post.slug}`}><a>
        <p className="text-2xl font-semibold">{post.title}</p>
        <p className="text-sm font-light">{post.subtitle}</p>
    </a></Link>)
    
    const postTile = ref 
        ? <div 
            ref={ref as React.MutableRefObject<HTMLInputElement>} 
            className={tileClassName}
        >
            {body}
        </div>
        : <div className={tileClassName}>{body}</div>
        

    return postTile

})

Component.displayName = 'PostTile'
export default Component