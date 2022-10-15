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
        'prose border border-white text-white \
            prose-headings:text-white prose-p:text-white \
            prose-a:text-white prose-strong:text-white \
            prose-em:text-white prose-code:text-white',
        'prose border border-black',
        'prose border border-black'
    )

    return (<>
        <p className='text-4xl font-bold'>{content.title}</p>
        <p className='text-gray-500'>SUBTITLE: {content.subtitle}</p>
        <p className='text-gray-500'>{content.created}</p>
        <br/>
        <div className={bodyCN}>
            <ReactMarkdown>
            {content.body || ""}
            </ReactMarkdown>
        </div>
        <br/>
        <p>TAGS: {content.tags}</p>
        <p>REFEENCES: {content.references}</p>
        
        <p>EDITED: {content.edited}</p>
    </>);
  }