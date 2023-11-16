import MongoDB, { ObjectId } from "mongodb";
import { getTweets } from "../db/database.js";
import * as UserRepository from './auth.js';
// import { db } from '../db/database.js';

const SELECT_JOIN = 'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw JOIN users as us ON tw.userId = us.id';

const ORDER_DESC = 'ORDER BY tw.createdAt DESC';

export async function getAll() {
    return getTweets()
        .find()
        .sort({createdAt: -1})
        .toArray()
        .then(mapTweets);
}
export async function getAllByUsername(username) {
    return getTweets()
        .find({ username })
        .sort({ createdAt: -1})
        .toArray()
        .then(mapTweets);
}
export async function getById(id) {
    return getTweets()
        .find({_id: new ObjectId(id)})
        .next()
        .then(mapOptionalTweet)
}
export async function create(text, userId) {
    return UserRepository.findById(userId)
        .then((user) => 
            getTweets().insertOne({
                text,
                createdAt: new Date(),
                userId,
                name: user.name,
                username: user.username,
                url: user.url
            })
        )
        .then((result) => getById(result.insertedId))
        .then(mapOptionalTweet);
}

export async function update(id, text) {
    return getTweets().findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { text }},
        { returnDocument: "after" }
    )
    .then((result) => result)
    .then(mapOptionalTweet);
}
export async function remove(id) {
    return getTweets().deleteOne({ _id: new ObjectId(id) })
}

function mapOptionalTweet(tweet){
    return tweet ? { ...tweet, id: tweet.insertedId } : tweet;
}

function mapTweets(tweets) {
    return tweets.map(mapOptionalTweet);
}
