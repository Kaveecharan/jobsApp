import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import JobModal from '../Components/JobModal';
import './adminPage.css'
import axios from 'axios';

const AdminDashboard = () => {

  const [jobList, setJobList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleEditJob = (id) => {
    const theJobSelected = jobList.find((job)=> job.id === id)
    setSelectedJob(theJobSelected);
    setIsModalOpen(true);
  };

  const handleDeleteJob = async(id) => {
    try{
      const response = await axios.delete(`http://127.0.0.1:8000/api/jobs/${id}`);
      if(response.status == 200){
        const updatedJobList = jobList.filter((job) => job.id !== id);
        setJobList(updatedJobList);
      } else{
        console.log('failed')
      }
    }catch(err){
      console.log(err)
    }
  };

  const handleSaveJob = (jobData) => {
    console.log('selectedJob', selectedJob);
    if (selectedJob) {
      console.log('selectedJob');
      const updatedJobList = jobList.map((job) =>
        job.id === selectedJob.id ? { ...jobData, id: job.id } : job
      );
      setJobList(updatedJobList);
    } else {
      setJobList([...jobList, jobData]);
    }
    setIsModalOpen(false);
  };
  

  const handleAddJob = () => {
    setSelectedJob(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(()=>{
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/jobs');
        setLoading(false)
        setJobList(response.data.jobs);
      } catch (error) {
        setLoading(false)
        console.error(error);
      }
    };
    fetchJobs();
  }, [])

  return (
    <div>
      <Navbar />
      {loading
      ? <h1>Loading..</h1>
      : <>
      {jobList.map((job, id) => (
        <div key={id} className="adminJobsDiv">
          <div className='jobHeader'>
            <img src={job.image} alt={job.jobTitle} />
            <div className='jobHeaderRightDiv'>
              <div className='jobDetails'>
                <h3 className='jobHeadingAdmin'>{job.jobTitle}</h3>
                <p className='jobCatAdmin'>{job.category}</p>
              </div>
              <div className='jobButtons'>
                <button onClick={() => handleEditJob(job.id)}>Edit</button>
                <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className='addBTNDiv'>
        <button className='addJobBTN' onClick={handleAddJob}>Add Job</button>
      </div>
      </>}


      {isModalOpen && (
        <JobModal
          selectedJob={selectedJob}
          onClose={handleModalClose}
          onSave={handleSaveJob}
        />
      )}
    </div>
  );
};
  

export default AdminDashboard;
