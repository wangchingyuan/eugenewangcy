import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RedirectPage() {

    const router = useRouter();

    useEffect(() => {
        //alert(router.query.link); // Alerts 'Someone'
        setTimeout(() => {
            router.push(router.query.link)
        }, 3000)
    }, [router.query]);

    return( 
    <div className="text-center">
        <p>only admin account can edit posts</p>
        <p>redirecting in 3 seconds...</p>
    </div>)
}