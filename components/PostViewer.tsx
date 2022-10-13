import Link from 'next/link';


export default function PostViewer({ content }) {

    //todo: if slug don't exist redirect

    return (<>
        <h1>TITLE: {content.title}</h1>
        <h3>SUBTITLE: {content.subtitle}</h3>
        <p>BODY: {content.body}</p>
        <p>TAGS: {content.tags}</p>
        <p>REFEENCES: {content.references}</p>
        <p>CREATED: {content.created}</p>
        <p>EDITED: {content.edited}</p>
    </>);
  }