
import PostTile from "../../components/PostTile";
import { useState, useRef, useCallback } from "react";
import usePosts from "../../hooks/usePostHook"
import Link from "next/link";


export default function Blog({ isConnected } : { isConnected : boolean}) {
    
    const [query, setQuery] = useState('')
    const [pageNum, setPageNum] = useState(1)
    const { posts, isLoading, isError, error, hasNextPage } = usePosts(pageNum)

    const intObserver = useRef<IntersectionObserver | null>(null);
    const lastPostRef = useCallback((post:Element) => {
        if (isLoading) return
        if (intObserver.current) intObserver.current.disconnect()
        
        intObserver.current = new IntersectionObserver((posts) => {
            if (posts[0].isIntersecting && hasNextPage) {
                console.log('near last post')
                setPageNum(prev => prev + 1)
            }
        })

        if (post) intObserver.current.observe(post)
    }, [isLoading, hasNextPage]);// as React.MutableRefObject<HTMLInputElement>;

    if (isError) return (<p><>error: {error.message}</></p>)

    const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleQuery callled')
        setQuery(e.target.value)
        setPageNum((prevNum) => (prevNum += 1))
    }

    const content = posts.map((p, i) => {
        if (posts.length === i + 1) {
            console.log('last post seen')
            return <PostTile ref={lastPostRef} key={p.title} post={p} />
        }
        return <PostTile key={p.title} post={p} />
    })

    return ( 
        <div className="grid grid-rows-[auto_auto] p-10 gap-10">
            
            <div className="flex justify-between">
                <input type="text" onChange={handleQuery} placeholder="Search"/>
                <Link href="/writepost">write post</Link>
            </div>

            {/* {isConnected && <p>mongodb connected</p>} */}
            {content}
            {isLoading && <p>currently loading.....</p>}

        </div>
        
    )
}


//  export async function getServerSideProps(context) {
//     const { client } = await connectToDatabase()
//     // const { isConnected } = await client.isConnected() // error; mongo driver bug https://www.mongodb.com/community/forums/t/isconnected-not-a-function-in-next-js-app/121429/2
//     // fix with try/catch & clientPromise
//     let isConnected;
//     try {
//       const client = await clientPromise
//       isConnected = true;
//     } catch(e) {
//       console.log(e);
//       isConnected = false;
//     }
    
//     return {
//         props: { isConnected },
//     }
//  }