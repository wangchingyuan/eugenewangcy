// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../util/mongodb'
import { convertToSlug } from '../../util/toSlug'
import { ObjectId } from 'mongodb'

export default async function handler(
	req: NextApiRequest, 
	res: NextApiResponse
	) {

	const { db } = await connectToDatabase()

	// Saved newly created post
	if (req.method === 'POST') {
		req.body.tags = req.body.tags.replace(/ /g, '').split(',').filter((v:string)=>v)
		const slug = convertToSlug(req.body.title)
		const newPost = {
			...req.body, 
			...{ slug: slug },
			...{ created: new Date() },
			...{ edited: new Date() },
		}
		console.log('API called; posting..', newPost)
		const result1 = await db.collection('blogPosts').insertOne(newPost)
		console.log('inserted post:', result1)

		const emptyComment = {slug:slug, comments:[]}
		const result2 = await db.collection('blogPostComments').insertOne(emptyComment)
		console.log('inserted comment doc', result2)
		res.status(200).send({result:'success'})

	// Save edits of existing post
	} else if (req.method === 'PUT') {
		console.log('PUTTTIN post', req.body)
		// selected: to avoid changing the _id
		const selected = (({title, subtitle, body, references}) => (
			{title, subtitle, body, references}))(req.body)
		const newSlug = convertToSlug(req.body.title) // recompute slug
		const oldSlug = req.body.slug
		
		if (newSlug !== oldSlug) { // if title was modified
			console.log('new old slug different!', newSlug, oldSlug)
			// modify comments doc's associated slug
			const result = await db.collection('blogPostComments')
			.updateOne(
				{ slug: oldSlug },
				{ $set: {slug : newSlug} }, 
				{ upsert: false },
			);
			console.log('rename comm doc slug res:', result)
		}
		// convert tags string to list
		const tagsList = req.body.tags.replace(/ /g, '').split(',').filter((v:string)=>v)
		const partsToUpdate = {
			...selected, 
			...{slug: newSlug},
			...{tags: tagsList},
			...{edited: new Date()}
		}
		console.log('API called; putting..', partsToUpdate);
		const result = await db.collection('blogPosts')
			.updateOne(
				{ _id: new ObjectId(req.body._id) },
				{ $set : partsToUpdate }, 
				{ upsert: false },
			);
		console.log(`${result.matchedCount} match(s). Updated ${result.modifiedCount}`)
		res.json({message: `${result.matchedCount} match(s). Updated ${result.modifiedCount}`})

	// Get posts for main and individual blog page
	} else if (req.method === 'DELETE') {
		const { slug } = req.query
		console.log('API called; deleting... param: postslug:', slug);
		const result1 = await db.collection('blogPosts').deleteOne( { slug:slug } )
		const result2 = await db.collection('blogPostComments').deleteOne( { slug:slug } )
		console.log(`${result1.deletedCount} post docs matched and deleted`)
		console.log(`${result2.deletedCount} postComment docs matched and deleted`)
		res.json({message: `${result1.deletedCount} and ${result2.deletedCount} match(s) and delete(s)`})

	} else if (req.method ==='GET') {
		const { skip, slug } = req.query
		console.log('API called; getting... param skip:', skip, 'postslug:', slug);
		if (!slug) {
			const result = await db.collection('blogPosts').find({}).sort( { created: -1 } )
				.skip(parseInt(typeof skip==='string'? skip:'0')).limit(10).toArray();
			res.json(result)
		} else {
			const result = await db.collection('blogPosts').find( { slug: slug } ).toArray();
			console.log('get post res:', result) 
			res.json(result)
		}
	}
}

