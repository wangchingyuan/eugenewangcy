// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../util/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase()
  const { skip } = req.query
  const data = await db.collection('blogPosts').find({}).skip(parseInt(skip)).limit(10).toArray();
  res.json(data)
}

