declare module 'my-custom-types' {

    export interface BlogPostT {
        title?:string, 
        subtitle?:string, 
        body?:string, 
        references?:string,
        slug?:string, 
        tags?:Array<string>,
        created?:string,
        edited?:string,
    }
    export interface PostCommentsT {
        slug:string,
        comments: {
            username:string, 
            comment:string
        }[] | []
    }
    declare global {
        var mongo: { conn:any, promise:any }
    }
}