

export const getBlogPosts = async (pageNum = 1, options = {}) => {
    const offset = (pageNum - 1) * 10
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
    const { results } = await res.json();
    return results
}