
import React from "react"

// type PostType = {
//     title: string,
//     subtitle: string,
//     body: string,
// }


type PokeType = {
    name: string,
    url: string,
}

const Component = React.forwardRef( ({ post }:{ post: PokeType}, ref) => {

    const body = (<>
        <h1>{post.name}</h1>
        <h3>{post.url}</h3>
    </>)

    const postTile = ref 
        ? <div ref={ref} className="bg-gray-200">{body}</div>
        : <div className="bg-gray-200">{body}</div>

    return postTile

})

export default Component