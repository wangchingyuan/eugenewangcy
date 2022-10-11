import { useState, useEffect, useCallback } from "react";
import { getBlogPosts } from "../pages/api/getblogposts";

const usePosts = (pageNum = 1) => {
    const PokeDefault = { //for testing with poke data
        name: '',
        url: '',
    }
    const [posts, setPosts] = useState([PokeDefault])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState({})
    const [hasNextPage, setHasNextPage] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        setIsError(false)
        setError({})

        const controller = new AbortController()
        const { signal } = controller

        const getAndSet = async () => {
            const data = await getBlogPosts(pageNum, { signal })
            setPosts(prev => [...prev, ...data])
            setHasNextPage(Boolean(data.length))
            setIsLoading(false)
        }
        getAndSet()
        .catch((e) => {
            setIsLoading(false)
            if (signal.aborted) return
            setIsError(true)
            setError({message: e.message})
        })
        return () => controller.abort()

    }, [pageNum])

    return { posts, isLoading, isError, error, hasNextPage }
}

export default usePosts