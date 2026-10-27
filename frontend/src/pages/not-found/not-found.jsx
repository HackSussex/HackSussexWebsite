import styles from "./not-found.module.css";
import messages from "./not-found.messages";

console.log(messages);

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.notFound}>
        <h1 className={styles.pageHeader}>{messages.pageTitle}</h1>
        <p className={styles.pageDescription}>{messages.notFound}</p>
      </div>
    </div>
  );
};

export default NotFound;
