import Link from 'next/link'
import React, { useContext } from "react";
import { classNameByTheme } from '../util/themedClassName';
import {ThemeContext} from './ThemeContext';

export default function NavbarIcon(
    { name, url, onClick }:
    { name?:string, url?:string, onClick?:()=>void }
) {
    const {themeState} = useContext(ThemeContext);

    const className = classNameByTheme(
        themeState,
        'text-myDark-TXT p-3',
        'text-myWarm-TXT p-3',
        'text-myLight-TXT p-3'
      )

    return (
        <Link href={url || ''}>
            <div className={className}>
                <button onClick={onClick}>{name}</button>
            </div>
        </Link>
    )
}