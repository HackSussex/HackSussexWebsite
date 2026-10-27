import styles from "./hero.module.css";
import messages from "./hero.messages";
import Socials from "../../../components/socials/socials";
import HackSussexLogo from "../../../assets/hackSussex/logo.png";
import MobileLogo from "../../../assets/hackSussex/gradient.png";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.logoContainer}>
        <img
          className={styles.desktopLogo}
          src={HackSussexLogo}
          alt="Hack Sussex Logo"
        />
        <img
          className={styles.mobileLogo}
          src={MobileLogo}
          alt="Hack Sussex Mobile Logo"
        />
      </div>

      <p className={styles.description}>{messages.description}</p>

      {/* <div className={styles.socialsNewsletterContainer}>
                <Socials />
                <NewsletterSignup />
            </div> */}
    </div>
  );
};

export default Hero;
