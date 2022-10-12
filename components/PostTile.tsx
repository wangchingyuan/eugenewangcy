
import React from "react"

type PostType = {
    title: string,
    subtitle: string,
    body: string,
}


type PokeType = {
    name: string,
    url: string,
}

const Component = React.forwardRef( ({ post }:{ post: PostType}, ref) => {

    const body = (<>
        <h1>post:</h1>
        <h1>{post.title}</h1>
        <h3>{post.subtitle}</h3>
    </>)

    const postTile = ref 
        ? <div ref={ref} className="bg-gray-200">{body}</div>
        : <div className="bg-gray-200">{body}</div>
        

    return postTile

})

export default Component