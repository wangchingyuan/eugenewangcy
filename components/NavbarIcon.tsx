import Link from 'next/link'

export default function NavbarIcon(
    { name, url, onClick }:
    { name?:string, url?:string, onClick?:()=>void }
) {
    return (
        <Link href={url || ''}>
            <div className="p-3">
                <button onClick={onClick}>{name}</button>
            </div>
        </Link>
    )
}