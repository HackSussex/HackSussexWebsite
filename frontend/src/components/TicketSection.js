import React from 'react';

const TicketSection = (props) => {
  return (
    <div className="container p-5 pt-5">
      <div className="row">
        <h2 className="display-3 text-center fw-bold">Tickets are now live!</h2>
      </div>
      <div className='row pt-3'>
        <button type='button' className='btn btn-blue btn-lg p-3 w-auto me-auto ms-auto' onClick={() => window.open(props.url, '_blank')}><span className="h3 fw-bold">Get Tickets</span></button>
      </div>
    </div>
  );
};

export default TicketSection;
