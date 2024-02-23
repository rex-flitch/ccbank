import React, { useState } from 'react'
import parse from 'html-react-parser'

const Accordion = ({ summary, details }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="accordion-item" style={styles.accordionItem}>
      <div
        className="accordion-summary"
        onClick={toggleOpen}
        style={{ ...styles.accordionSummary, cursor: 'pointer' }}
      >
        <span style={styles.accordionIcon}>{isOpen ? '-' : '+'}</span>
        {summary}
        
      </div>
      {isOpen && (
        <div className="accordion-details" style={styles.accordionDetails}>
          {parse(details)}
        </div>
      )}
    </div>
  );
};

const styles = {
  accordionItem: {
    borderBottom: '1px solid #ddd',
    marginBottom: '10px',
    boxShadow: '0 0 4px #ddd',
  },
  accordionSummary: {
    fontWeight: 'bold',
    padding: '15px',
  },
  accordionDetails: {
    fontSize: '0.9em',
    paddingLeft: '20px',
  },
  accordionIcon: {
    float: 'left',
    color: '#fff',
    backgroundColor: '#444444',
    padding: '0 4px',
    marginRight: '20px',
  },
};

export default Accordion;