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
		const { slug, idx } = req.query
		console.log('Comm. API ; deleting.. postslug:', slug,'idx:',idx  );
		const toUnset = {[`comments.${idx}`]:null}
		const result1 = await db.collection('blogPostComments')
			.update(
				{ slug : slug }, 
				{ $set : toUnset},
			)
		console.log(`${result1.matchedCount} matched ${result1.modifiedCount} set to null`)

		const result2 = await db.collection('blogPostComments')
			.update( 
				{ slug : slug }, //filter
				{ $pull : { 'comments':null } }
			)
		console.log(`${result2.matchedCount} null found ${result1.modifiedCount} deleted`)
		
	// Get posts for main and individual blog page
	} else {
		const { slug } = req.query
		console.log('Comm. API called; GET for post:', slug)
		const data = await db.collection('blogPostComments').find( { slug: slug } ).toArray(); 
		res.json(data)
	}
}

