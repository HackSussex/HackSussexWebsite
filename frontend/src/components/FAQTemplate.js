import React from "react"

const FAQTemplate = (props) => {

  const faqs = props.faqs
  const title = props.title

  return (
    <>
    <div className="accordion accordion-flush" id={{title}+'Accordion'}>
          {faqs.map((faq, index) => {
            return (
              <div className="accordion-item mb-4 rounded" key={index}>
                <div className="accordion-header" id={`faqHeading${index}`}>
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#faqCollapse${index}`} aria-expanded="false" aria-controls={`faqCollapse${index}`}>
                    {faq.question}
                  </button>
                </div>
                <div id={`faqCollapse${index}`} className="accordion-collapse collapse" aria-labelledby={`faqHeading${index}`} data-bs-parent="#faqAccordion">
                  <div className="accordion-body bg-light">
                    {faq.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
    </>
  )
}

export default FAQTemplate