import Hero from "./hero/hero";
import UpcomingEvents from "./upcoming-events/upcomingEvents";
import styles from "./home.module.css";
import Sponsors from "./home-sponsors/homeSponsors";
import Video from "./video/video";
import EventTypes from "./events/events";
import JoinCommittee from "./join-committee/joinCommittee";

const Home = () => {
  return (
    <div className={styles.homePage}>
      <Hero />
      <UpcomingEvents />
      <Sponsors />
      <Video />
      <EventTypes />
      {/* <JoinCommittee /> */}
    </div>
  );
};

export default Home;
