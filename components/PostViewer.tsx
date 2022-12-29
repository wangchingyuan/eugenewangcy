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
        'prose w-4/5 m-auto text-white \
            prose-headings:text-white prose-p:text-white \
            prose-a:text-white prose-strong:text-white \
            prose-em:text-white prose-code:text-white',
        'prose w-4/5 m-auto',
        'prose w-4/5 m-auto'
    )

    return (
        <div>
            <div ><p className='prose m-auto text-4xl font-bold text-center mb-4'>{content.title}</p></div>
            <div><p className='prose m-auto text-gray-500 mb-1'>{content.subtitle}</p></div>
            <div><p className='prose m-auto text-gray-500'>{content.created?.slice(0,10)}</p></div>
            <br/>
            <div className={bodyCN}>
                <ReactMarkdown>
                {content.body || ""}
                </ReactMarkdown>
            </div>
            <br/>
            <p className='prose m-auto'>Tags: {content.tags}</p>
            {content.references !== '' && <p className='prose m-auto'>References: {content.references}</p>}
            
            <p className='prose m-auto'>Edited: {content.edited?.slice(0,10)}</p>
    </div>);
  }