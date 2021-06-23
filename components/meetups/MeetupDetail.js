import classes from './MeetupDetail.module.css';

export default function MeetupDetail(props) {
  function delHandler() {
     props.onDelMeetup(props._id);
  }
  
  return (
    <section className={classes.detail}>
      <img src={props.image} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
      <button onClick={delHandler}>Delete</button>
    </section>
  );
}
