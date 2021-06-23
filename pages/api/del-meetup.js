import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const id = req.body;

    const client = await MongoClient.connect(`mongodb+srv://${process.env.MONGODB_AWS_USER}:${process.env.MONGODB_AWS_PASS}@cluster0.doqi3.mongodb.net/meetups?retryWrites=true&w=majority`);
    const meetupsCollection = client.db().collection('meetups');
    const result = await meetupsCollection.deleteOne({ _id: ObjectId(id) });

    console.log(result);
    client.close();

    res.status(200).json({message:'Meetup deleted!'});
  }
}
