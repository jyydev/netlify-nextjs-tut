import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_AWS_USER}:${process.env.MONGODB_AWS_PASS}@cluster0.doqi3.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const meetupsCollection = client.db().collection('meetups');
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  console.log(meetups);
  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_AWS_USER}:${process.env.MONGODB_AWS_PASS}@cluster0.doqi3.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const meetupsCollection = client.db().collection('meetups');
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  selectedMeetup._id = selectedMeetup._id.toString();
  return {
    props: {
      meetupData: selectedMeetup,
    },
  };
}

export default function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta title='description' content={props.meetupData.description} />
      </Head>
      <MeetupDetail {...props.meetupData} />
    </>
  );
}
