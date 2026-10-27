import FAQTemplate from "../components/FAQTemplate";
import React from "react";

const FAQ = () => {

  const qa_dict = [
    {
        question: "Since when has HackSussex been active?",
        answer: "The society has been active since 2012."
    },
    {
        question: "What types of events and activities does we organize?",
        answer: "The society organizes various Hackathons, programming competitions, workshops and networking sessions."
    },
    {
        question: "Who has the society collaborated with other organizations over the years?",
        answer: "Key highlights include: GitHub, BCS the chartered institute for IT, Teach First, EDF, Overleaf and many more."
    },
    {
        question: "How can I get in touch?",
        answer: "Interested individuals can get in touch by emailing contact@hacksussex.com."
    },
    {
        question: "What typically happens at one of your 24-hour hackathons?",
        answer: "Across the 24 Hacking window, we run a mixture of workshops with sponsors and more social events. Not only do we do this, we also supply you with each meal from amazing Brighton-based caterers."
    },
    {
        question: "Are your events suitable for both competitive and laid-back individuals?",
        answer: "Yes, there's room for both the competitive and the laid-back at all of our events."
    },
    {
        question: "What can participants expect to gain in terms of skills and experience at an event?",
        answer: "You will get the chance to work on your programming skills, robotics, team working and industry networking."
    },
    {
        question: "What rules are in place for your events?",
        answer: "We abide by the Hackathons UK Code of Conduct"
    },
    {
        question: "Are there any costs associated with attending a HackSussex event?",
        answer: "No, attending a HackSussex event is free for participants."
    },
  ]

  return (
    <>
      <div className="p-3 mt-4 text-center">
        <h1 className="display-5">FAQ</h1>
      </div>
      <div className="container">
        <FAQTemplate faqs={qa_dict} title="faq" />
      </div>
    </>
  )

}

export default FAQ