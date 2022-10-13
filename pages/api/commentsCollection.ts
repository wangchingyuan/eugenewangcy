// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../util/mongodb'
import { convertToSlug } from '../../util/toSlug'

export default async function handler(
	req: NextApiRequest, 
	res: NextApiResponse
	) {

	const { db } = await connectToDatabase()

	// Saved newly created comment
	if (req.method === 'PUT') {

        const postSlug = req.body.slug
		const newComment = {
			...{username: req.body.username},
            ...{comment: req.body.comment},
			...{created: new Date()},
		}
		console.log('Comm. API called; POST payload:', newComment)
		const result = await db.collection('blogPostComments')
			.updateOne(
				{ slug: postSlug },
				{ $push : {comments : newComment} }, 
				{ upsert: false },
			);
		console.log('comm. inserted')
		console.log(`${result.matchedCount} match(s). Updated ${result.modifiedCount}`)
        res.json(result)
		//res.status(200)

	// Save edits of existing post
	} else if (req.method === 'DELETE') {
        return;
		// selected: to avoid changing the _id
		const selected = (({title, subtitle, body, references, slug}) => (
			{title, subtitle, body, references, slug}))(req.body)
		req.body.tags = req.body.tags.replace(/ /g, '').split(',').filter(v=>v)
		const partsToUpdate = {
			...selected, 
			...{tags: req.body.tags},
			...{edited: new Date()}
		}
		console.log('API called; putting..', partsToUpdate);
		const result = await db.collection('blogPosts')
			.updateOne(
				{ title: req.body.title },
				{ $set : partsToUpdate }, 
				{ upsert: false },
			);
		console.log(`${result.matchedCount} match(s). Updated ${result.modifiedCount}`)
		res.json({message: `${result.matchedCount} match(s). Updated ${result.modifiedCount}`})
		
	// Get posts for main and individual blog page
	} else {
		const { slug } = req.query
		console.log('Comm. API called; GET for post:', slug)
		const data = await db.collection('blogPostComments').find( { slug: slug } ).toArray(); 
		res.json(data)
	}
}

