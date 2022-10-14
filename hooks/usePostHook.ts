import { BlogPostT } from "my-custom-types";
import { useState, useEffect, useCallback } from "react";

const usePosts = (pageNum = 1) => {
    type errorT =  {
        message?: string
    }
    const [posts, setPosts] = useState<BlogPostT[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState<errorT>({})
    const [hasNextPage, setHasNextPage] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        setIsError(false)
        setError({})

        const controller = new AbortController()
        const { signal } = controller

        const getAndSet = async () => {
            const offset = (pageNum - 1) * 10
            const res = await fetch(`/api/postsCollection?skip=${offset}`)
            const data = await res.json()
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