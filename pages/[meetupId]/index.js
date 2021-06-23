import MeetupDetail from '../../components/meetups/MeetupDetail';

export async function getStaticPaths(params) {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: 'm1',
        },
      },
      {
        params: {
          meetupId: 'm2',
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  return {
    props: {
      meetupData: {
        id: meetupId,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
        title: 'The First Meetup',
        address: 'random address',
        description: 'randomd description',
      },
    },
  };
}

export default function MeetupDetails(props) {
  return <MeetupDetail {...props.meetupData} />;
}
