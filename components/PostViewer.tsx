import { BlogPostT } from 'my-custom-types';
import { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { classNameByTheme } from '../util/themedClassName';
import { ThemeContext } from './ThemeContext';

export default function PostViewer({ content } : { content : BlogPostT}) {

    //todo: if slug don't exist redirect
    const {themeState} = useContext(ThemeContext);
    const primaryCN = classNameByTheme(
        themeState,
        'prose m-auto text-white \
            prose-headings:text-gray-1 prose-p:text-gray-1 \
            prose-a:text-white prose-strong:text-white \
            prose-em:text-white prose-code:text-white text-white',
        'prose m-auto \
            prose-headings:text-black prose-p:text-black \
            prose-a:text-black prose-strong:text-black \
            prose-em:text-black prose-code:text-black text-black',
        'prose m-auto \
            prose-headings:text-black prose-p:text-black \
            prose-a:text-black prose-strong:text-black \
            prose-em:text-black prose-code:text-black text-black',
    )
    const secondaryCN = classNameByTheme(
        themeState,
        'prose m-auto prose-p:text-gray-100 prose-p:font-bold',
        'prose m-auto prose-p:text-gray-500 prose-p:font-bold',
        'prose m-auto prose-p:text-gray-9 prose-p:font-bold'
    )

    return (
        <div>
            <div className={primaryCN}><p className='text-4xl font-bold text-center mb-4'>{content.title}</p></div>
            <div className={secondaryCN}><p>{content.subtitle}</p></div>
            <div className={secondaryCN}><p>{content.created?.slice(0,10)}</p></div>
            <br/>
            <div className={primaryCN}>
                <ReactMarkdown>
                {content.body || ""}
                </ReactMarkdown>
            </div>
            <br/>
            <div className={primaryCN}><p>Tags: {content.tags}</p></div>
            {content.references !== '' && <p className='prose m-auto'>References: {content.references}</p>}
            
            <div className={primaryCN}><p>Edited: {content.edited?.slice(0,10)}</p></div>
    </div>);
  }