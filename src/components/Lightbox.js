import React from 'react';

function Lightbox({ isOpen, videoId, onClose }) {
    if (!isOpen) return null;

    const maxWidth = 1400; // Maximum width of the video
    const aspectRatio = 16 / 9; // Aspect ratio of YouTube videos
  
    // Calculate height based on the maximum width and the aspect ratio
    const height = maxWidth / aspectRatio;
  
    return (
      <div style={{
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        zIndex: 1000 // Ensures it's above other content
      }} onClick={onClose}>
        <div style={{
          position: 'relative',
          width: '100%', 
          maxWidth: `${maxWidth}px`, // Max width for the video
          height: `${height}px`, // Height calculated based on aspect ratio
        }} onClick={e => e.stopPropagation()}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Embedded youtube"
            style={{ width: '100%', height: '100%' }}
          />
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '-35px',
            right: '10px',
            padding: '5px 8px',
            fontSize: '30px',
            color: '#fff',
            border: 'none',
            background: 'rgba(0, 0, 0, 0.8)',
            cursor: 'pointer',
            lineHeight: '22px'
          }}
        >
          &times; {/* Unicode character for "X" */}
        </button>
      </div>
    </div>
  );
}

export default Lightbox;
