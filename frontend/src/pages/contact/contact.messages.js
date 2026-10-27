// contact.messages.js
const messages = {
  page: {
    title: "Contact Us",
    submitButton: "Send Message",
    description:
      "We aim to respond to all inquiries within 2 business days. Please fill out the form below and we’ll get back to you as soon as possible.",
    clearButton: "Clear",
    labels: {
      name: "Your name",
      email: "Your email",
      reason: "Contact reason",
      message: "Message",
    },
    placeholders: {
      name: "Your name",
      email: "Your email",
      message: "Your message",
    },
  },
  thankYou: {
    title: "Thank you for your message!",
    description: "We’ll get back to you as soon as possible.",
  },

  reasons: {
    sponsor: {
      value: "sponsoring_event",
      label: "Sponsoring an Event",
    },
    committee: {
      value: "joining_committee",
      label: "Joining the Committee",
    },
    business: {
      value: "business",
      label: "Business Inquiry",
    },
    feedback: {
      value: "feedback",
      label: "Feedback",
    },
    default: {
      value: "general",
      label: "General Inquiry",
    },
  },
};

export default messages;
