import type { ReactElement } from 'react'

export default function NavbarIcon({ children }:{children:ReactElement}) {
    return (
    <div className="navbar-icon">
        { children }
    </div>
    )
}