import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_AWS_USER}:${process.env.MONGODB_AWS_PASS}@cluster0.doqi3.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupsCollection = client.db().collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  console.log(meetups);
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Nextjs Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups!"/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export default function HomePage(props) {
//   const [loadedMeetups, setLoadedMeetups] = useState([]);
//   useEffect(() => {
//     setLoadedMeetups(DUMMY_MEETUPS);
//   }, []);
//   return <MeetupList meetups={loadedMeetups} />;
// }
