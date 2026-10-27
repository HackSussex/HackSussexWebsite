const messages = {
  header: "Privacy Policy",
  lastUpdated: "Last updated: January 2026",
  intro:
    "HackSussex is committed to protecting your personal data and respecting your privacy. This privacy policy explains how we collect, use, store, and protect your personal information when you interact with HackSussex, including when you register for or attend our events. This policy is written in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.",

  section1: {
    title: "1. Who we are",
    content:
      "HackSussex is a student-led technology community that organises multiple events, including but not limited to hackathons, workshops, talks, and social events. HackSussex is organised by volunteers based in the United Kingdom.",
  },

  section2: {
    title: "2. What personal data we collect",
    intro:
      "Depending on the event or activity you take part in, we may collect the following categories of personal data:",
    categories: [
      {
        title: "Identity and contact data",
        items: [
          "Full name",
          "Email address",
          "University or educational institution",
          "Course of study and year",
          "Demographics such as gender and ethnicity",
        ],
      },
      {
        title: "Event-related information",
        items: [
          "Hackathon registration details",
          "Teammate information",
          "Attendance information (check-in data)",
        ],
      },
      {
        title: "Welfare and accessibility information",
        items: [
          "Dietary Requirements",
          "Accessibility or medical requirements (only where necessary for your safety or participation)",
        ],
      },
      {
        title: "Recruitment and participation data",
        items: [
          "Applications to volunteer or join the committee",
          "Skills, experience, and availability (if provided)",
        ],
      },
      {
        title: "Media and communications data",
        items: [
          "Photographs or video recordings taken during the event",
          "Feedback responses and survey answers",
        ],
      },
    ],
  },

  section3: {
    title: "3. How we use your personal data",
    intro: "We use your personal data for the following purposes:",
    purposes: [
      "To organise and run HackSussex events and activities",
      "To manage registrations, attendance, and team formation",
      "To ensure participant safety, welfare, and accessibility",
      "To communicate important event information before, during, and after the event",
      "To recruit volunteers or organisers",
      "To improve future events through feedback and analysis",
      "To promote HackSussex through photographs or recordings",
    ],
  },

  section4: {
    title: "4. Lawful bases for processing",
    intro: "Under UK GDPR, we rely on the following lawful bases:",
    bases: [
      {
        term: "Consent",
        description:
          "for dietary requirements, accessibility needs, marketing communications, and media usage where required",
      },
      {
        term: "Contract",
        description:
          "where processing is necessary to deliver the event you registered for",
      },
      {
        term: "Legitimate interests",
        description:
          "for organising the event, internal administration, and improving future events",
      },
      {
        term: "Legal obligation",
        description: "where required to comply with applicable laws",
      },
    ],
  },

  section5: {
    title: "5. Marketing and communications",
    content:
      "We may send you event related updates or information relevant to Hacksussex. You will only receive marketing or promotional communications where you have consented, and you may opt out at any time by contacting us.",
  },

  section6: {
    title: "6. Sharing your data",
    intro:
      "We do not sell your personal data. We may share limited personal data with trusted third parties where necessary to run Hacksussex, including:",
    parties: [
      {
        name: "Devpost",
        description:
          "used for hackathon participation, team formation, and project submissions",
      },
      {
        name: "Pretix",
        description: "used for ticketing and event registration",
      },
      {
        name: "Mailchimp",
        description:
          "used to collect email addresses and send event announcements and updates",
      },
      "Event partners or sponsors, only where explicitly stated and with your consent",
      "Service providers used for registration, communication, or event management",
      "Emergency services where required for safety reasons",
    ],
    footer:
      "These third parties act as independent data controllers or processors and handle your data in accordance with their own privacy policies. All third parties are required to handle your data securely and lawfully.",
  },

  section7: {
    title: "7. Data retention",
    paragraphs: [
      "Much of the personal data collected for Hacksussex events is stored and managed by third-party platforms such as Devpost, Pretix, and Mailchimp. These platforms retain personal data in accordance with their own data retention policies, over which Hacksussex has limited control.",
      "Where personal data is stored directly by Hacksussex, we aim to:",
    ],
    retentionPolicies: [
      "Retain registration and attendance data only for as long as required to run and review the event",
      "Retain recruitment or committee application data for up to 12 months",
      "Retain media content for as long as it remains relevant for promotional purposes",
    ],
    conclusion:
      "We regularly review the personal data we hold and delete or anonymise it where it is no longer necessary. You may also request deletion of your personal data, subject to any legal or operational requirements.",
  },

  section8: {
    title: "8. Your data protection rights",
    intro: "You have the right to:",
    rights: [
      "Access your personal data",
      "Request correction of inaccurate data",
      "Request deletion of your data",
      "Object to or restrict processing",
      "Withdraw consent at any time",
      "Lodge a complaint with the Information Commissioner's Office (ICO)",
    ],
    footer:
      "You also have the right to lodge a complaint with the Information Commissioner's Office (ICO), the UK's data protection regulator, if you believe your data has been handled unlawfully.",
    contact:
      "To exercise any of these rights, please contact us at contact@hacksussex.com.",
  },

  section9: {
    title: "9. Data security",
    content:
      "We take reasonable technical and organisational measures to protect your personal data against loss, misuse, or unauthorised access.",
  },

  section10: {
    title: "10. Changes to this policy",
    content:
      "We may update this Privacy Policy from time to time. Any changes will be published on our website and will take effect immediately upon posting.",
  },

  section11: {
    title: "11. Contact us",
    content:
      "If you have any questions about this privacy policy or how we handle your data, please contact:",
    email: "contact@hacksussex.com",
  },
};

export default messages;
