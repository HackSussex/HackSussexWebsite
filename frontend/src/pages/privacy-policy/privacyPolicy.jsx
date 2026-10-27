import styles from "./privacyPolicy.module.css";
import messages from "./privacyPolicy.messages";

const privacyPolicy = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{messages.header}</h1>
      <p className={styles.lastUpdated}>{messages.lastUpdated}</p>
      <p className={styles.intro}>{messages.intro}</p>

      {/* Section 1 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{messages.section1.title}</h2>
        <p>{messages.section1.content}</p>
      </section>

      {/* Section 2 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{messages.section2.title}</h2>
        <p>{messages.section2.intro}</p>
        {messages.section2.categories.map((category, index) => (
          <div key={index} className={styles.category}>
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <ul className={styles.list}>
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Section 3 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{messages.section3.title}</h2>
        <p>{messages.section3.intro}</p>
        <ul className={styles.list}>
          {messages.section3.purposes.map((purpose, index) => (
            <li key={index}>{purpose}</li>
          ))}
        </ul>
      </section>

      {/* Section 4 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{messages.section4.title}</h2>
        <p>{messages.section4.intro}</p>
        <ul className={styles.list}>
          {messages.section4.bases.map((basis, index) => (
            <li key={index}>
              <strong>{basis.term}</strong> - {basis.description}
            </li>
          ))}
        </ul>
      </section>

      {/* Section 5 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{messages.section5.title}</h2>
        <p>{messages.section5.content}</p>
      </section>

      {/* Section 6 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{messages.section6.title}</h2>
        <p>{messages.section6.intro}</p>
        <ul className={styles.list}>
          {messages.section6.parties.map((party, index) => (
            <li key={index}>
              {typeof party === "object" ? (
                <>
                  <strong>{party.name}</strong> - {party.description}
                </>
              ) : (
                party
              )}
            </li>
          ))}
        </ul>
        <p>{messages.section6.footer}</p>
      </section>

      {/* Section 7 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{messages.section7.title}</h2>
        {messages.section7.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        <ul className={styles.list}>
          {messages.section7.retentionPolicies.map((policy, index) => (
            <li key={index}>{policy}</li>
          ))}
        </ul>
        <p>{messages.section7.conclusion}</p>
      </section>

      {/* Section 8 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{messages.section8.title}</h2>
        <p>{messages.section8.intro}</p>
        <ul className={styles.list}>
          {messages.section8.rights.map((right, index) => (
            <li key={index}>{right}</li>
          ))}
        </ul>
        <p>{messages.section8.footer}</p>
        <p>{messages.section8.contact}</p>
      </section>

      {/* Section 9 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{messages.section9.title}</h2>
        <p>{messages.section9.content}</p>
      </section>

      {/* Section 10 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{messages.section10.title}</h2>
        <p>{messages.section10.content}</p>
      </section>

      {/* Section 11 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{messages.section11.title}</h2>
        <p>{messages.section11.content}</p>
        <p className={styles.email}>{messages.section11.email}</p>
      </section>
    </div>
  );
};

export default privacyPolicy;
