import React, { useEffect, useState } from 'react';

const SingleJobModal = ({ selectedJob, closeModal }) => {


  return (
    <div className="modal" style={{ fontFamily: 'Rajdhani', color: '#0b3326'}}>
      <div className="modal">
          <div className="modalContent" style={{background: '#fff', padding: '20px 30px', borderRadius: '10px'}}>
            <span className="closeButton" onClick={closeModal} style={{ background: '#c55656', cursor: 'pointer', color: '#fff', padding: '5px 20px'}}>
              Close
            </span>
            {selectedJob && (
              <>
                <h2 style={{ fontFamily: 'Special Elite'}}>{selectedJob.jobTitle}</h2>
                <img
                  src={selectedJob.image}
                  alt={selectedJob.jobTitle}
                  className="modalImage"
                />
                <div
                  className="jobDesc"
                  dangerouslySetInnerHTML={{ __html: selectedJob.content }}
                ></div>
              </>
            )}
          </div>
        </div>
    </div>
  );
};

export default SingleJobModal;