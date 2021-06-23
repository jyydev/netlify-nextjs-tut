import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const mongodb_aws_url = `mongodb+srv://${process.env.MONGODB_AWS_USER}:${process.env.MONGODB_AWS_PASS}@cluster0.doqi3.mongodb.net/meetups?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(mongodb_aws_url);
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);

    console.log(result);
    client.close();

    res.status(201).json({message:'Meetup inserted!'});
  }
}
