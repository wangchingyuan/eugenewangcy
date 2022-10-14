import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RedirectPage() {

    const router = useRouter();

    useEffect(() => {
        //alert(router.query.link); // Alerts 'Someone'
        setTimeout(() => {
            const link = router.query.link
            router.push(typeof link==='string'?link:'/')
        }, 3000)
    }, [router]);

    return( 
    <div className="text-center">
        <p>only admin account can edit posts</p>
        <p>redirecting in 3 seconds...</p>
    </div>)
}