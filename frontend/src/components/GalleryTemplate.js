import React, { useState, useRef } from 'react';

function GalleryTemplate(props) {
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [expandedImage, setExpandedImage] = useState(null);

  const modalContentRef = useRef(null);

  const containerStyle = {
    height: '200px',
    overflow: 'hidden'
  };

  const coverImageStyle = {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    cursor: 'pointer'
  };

  const closeButtonStyle = {
    background: 'transparent',
    border: 'none',
    fontSize: '2rem',
    color: 'var(--super-dark)'
  };

  const modalTitleStyle = {
    color: 'var(--super-dark)'
  };

  const modalContentStyle = {
    backgroundColor: 'var(--text)'
  };

  const modalBackdropStyle = {
    backgroundColor: 'rgba(28, 37, 45, 0.8)',
    backdropFilter: 'blur(5px)'
  };

  const largeButtonStyle = {
    border: 'none',
    transition: '0.3s ease',
    textDecoration: 'none !important',
  };

  
  const activeButtonStyle = {
    ...largeButtonStyle,
    backgroundColor: 'var(--electric-green)',
  };
    
  const handleBackdropClick = (e) => {
    if (!modalContentRef.current.contains(e.target)) {
      setExpandedImage(null);
    }
  };

  // Filter images based on the selected event
  const filteredImages = props.images.filter(img => selectedEvent === 'all' || img.event === selectedEvent);

  // Find YouTube video for the selected event
  const eventVideo = props.videos.find(video => video.event === selectedEvent);

  return (
    <div className="container mt-4">
      {/* Buttons to select event */}
      <div className="row justify-content-center">
        {props.events.map((event) => (
          <div key={event.id} className="col-6 col-md-4 col-lg-3 mb-3">
            <button
              className="btn w-100 btn-blue"
              style={selectedEvent === event.id ? activeButtonStyle : largeButtonStyle} 
              onClick={() => setSelectedEvent(event.id)}
              >
              {event.name}
            </button>
          </div>
        ))}
      </div>

      {eventVideo && (
        <div style={{ position: 'relative', paddingBottom: '40%', height: 0, marginTop: '30px', marginBottom: '30px' }}>
          <iframe 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            src={`https://www.youtube.com/embed/${eventVideo.videoId}`} 
            allowFullScreen
            title="YouTube video player"
          ></iframe>
        </div>
      )}

      <div className="row">
        {filteredImages.map(img => (
          <div key={img.id} className="col-md-4 mb-4" style={containerStyle}>
            <img src={img.url} alt={img.description} title={img.description} style={coverImageStyle} onClick={() => setExpandedImage(img)} />
          </div>
        ))}
      </div>

      {expandedImage && (
        <>
          <div 
            style={{...modalBackdropStyle, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1040 }} 
            onClick={handleBackdropClick}
          >
            <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ zIndex: 1050 }}>
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content" ref={modalContentRef} style={modalContentStyle}>
                  <div className="modal-header">
                    <h5 className="modal-title" style={modalTitleStyle}>{expandedImage.description}</h5>
                    <button type="button" style={closeButtonStyle} data-dismiss="modal" aria-label="Close" onClick={() => setExpandedImage(null)}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <img src={expandedImage.url} alt={expandedImage.description} title={expandedImage.description} className="img-fluid" style={{borderRadius: '8px'}} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default GalleryTemplate;
