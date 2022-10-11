import { useSession, signIn, signOut } from "next-auth/react"
import LoginBtn from "../components/LoginBtn"
import PostTile from "../components/PostTile";
import { useState, useRef, useCallback } from "react";
import usePosts from "../lib/hooks"

export default function Blog() {
    
    const [query, setQuery] = useState('')
    const [pageNum, setPageNum] = useState(1)
    const { posts, isLoading, isError, error, hasNextPage } = usePosts(pageNum)

    const intObserver = useRef<IntersectionObserver | null>(null);
    const lastPostRef = useCallback((post) => {
        if (isLoading) return
        if (intObserver.current) intObserver.current.disconnect()
        
        intObserver.current = new IntersectionObserver((posts) => {
            if (posts[0].isIntersecting && hasNextPage) {
                console.log('near last post')
                setPageNum(prev => prev + 1)
            }
        })

        if (post) intObserver.current.observe(post)
    }, [isLoading, hasNextPage]);

    if (isError) return <>error: ${error}</>

    const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleQuery callled')
        setQuery(e.target.value)
        setPageNum((prevNum) => (prevNum += 1))
    }

    const content = posts.map((p, i) => {
        if (posts.length === i + 1) {
            console.log('last post seen')
            return <PostTile ref={lastPostRef} key={p.name} post={p} />
        }
        return <PostTile key={p.name} post={p} />
    })

    return ( 
        <div className="grid grid-rows-[auto_auto] p-10 gap-10">
            <h1>my blog here</h1>

            <input type="text" onChange={handleQuery}></input>

            {content}
            {isLoading && <p>currently loading.....</p>}
            
            <div>Loading</div>
            <div>Error</div>

            <LoginBtn />
        </div>
        
    )
}