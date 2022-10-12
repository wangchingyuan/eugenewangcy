import { MongoClient } from 'mongodb'

const { MONGODB_URI, MONGODB_DB } = process.env

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI not defined in .env.local')
}

if (!MONGODB_DB) {
    throw new Error('MONGODB_DB not defined in .env.local')
}

// preserves connection during hot reloads
let cached = global.mongo

if (!cached) {
    cached = global.mongo = { conn:null, promise:null }
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn
    }
    if (!cached.promise) {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        cached.promise = MongoClient.connect(MONGODB_URI, options).then((client) => {
            console.log('mongodb connected')
            return {
                client,
                db: client.db(MONGODB_DB)
            }
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}