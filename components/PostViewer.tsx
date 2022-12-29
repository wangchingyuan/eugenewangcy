import { BlogPostT } from 'my-custom-types';
import { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { classNameByTheme } from '../util/themedClassName';
import { ThemeContext } from './ThemeContext';

export default function PostViewer({ content } : { content : BlogPostT}) {

    //todo: if slug don't exist redirect
    const {themeState} = useContext(ThemeContext);
    const bodyCN = classNameByTheme(
        themeState,
        'prose text-white \
            prose-headings:text-white prose-p:text-white \
            prose-a:text-white prose-strong:text-white \
            prose-em:text-white prose-code:text-white',
        'prose ',
        'prose '
    )

    return (<div className='p-5'>
        <p className='text-4xl font-bold mb-2'>{content.title}</p>
        <p className='text-gray-500 mb-1'>{content.subtitle}</p>
        <p className='text-gray-500'>{content.created?.slice(0,10)}</p>
        <br/>
        <div className={bodyCN}>
            <ReactMarkdown>
            {content.body || ""}
            </ReactMarkdown>
        </div>
        <br/>
        <p>Tags: {content.tags}</p>
        <p>References: {content.references}</p>
        
        <p>Edited: {content.edited?.slice(0,10)}</p>
    </div>);
  }