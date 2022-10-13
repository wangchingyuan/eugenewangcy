// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../util/mongodb'
import { convertToSlug } from '../../util/toSlug'

export default async function handler(
	req: NextApiRequest, 
	res: NextApiResponse
	) {

	const { db } = await connectToDatabase()
	// Saved newly created post
	if (req.method === 'POST') {
		req.body.tags = req.body.tags.replace(/ /g, '').split(',').filter(v=>v)
		const slug = convertToSlug(req.body.title)
		const newPost = {
			...req.body, 
			...{ slug: slug },
			...{ created: new Date() },
			...{ edited: new Date() },
		}
		console.log('API called; posting..', newPost)
		const result1 = await db.collection('blogPosts').insertOne(newPost)
		console.log('inserted', result1)

		const emptyComment = {slug:slug, comments:[]}
		const result2 = await db.collection('blogPostComments').insertOne(emptyComment)
		//res.status(200)

	// Save edits of existing post
	} else if (req.method === 'PUT') {
		// selected: to avoid changing the _id
		const selected = (({title, subtitle, body, references, slug}) => (
			{title, subtitle, body, references, slug}))(req.body)
		const tagsList = req.body.tags.replace(/ /g, '').split(',').filter(v=>v)
		const partsToUpdate = {
			...selected, 
			...{tags: tagsList},
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
		
		const emptyComment = {slug:selected.slug, comments:[]}
		const result2 = await db.collection('blogPostComments').insertOne(emptyComment)
	// Get posts for main and individual blog page
	} else {
		const { skip, slug } = req.query
		console.log('API called; getting... param skip:', skip, 'postslug:', slug);
		if (!slug) {
			const data = await db.collection('blogPosts').find({}).skip(parseInt(skip)).limit(10).toArray();
			res.json(data)
		}
		const data = await db.collection('blogPosts').find( { slug: slug } ).toArray(); 
		res.json(data)
	}
}

