import React, {useState, useEffect} from "react";
import './jobLists.css'
import axios from "axios";
import SingleJobModal from'./SingleJobModal'

const JobLists = ({ selectedCategory }) => {
  
  const [jobList, setJobList] = useState([]);
  const [selectedCatJobList, setSelectedCatJobList] = useState([])
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleImageClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setShowModal(false);
  };

  useEffect(()=>{
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/jobs');
        setLoading(false)
        setJobList(response.data.jobs);
        setSelectedCatJobList(response.data.jobs);
      } catch (error) {
        setLoading(false)
        console.error(error);
      }
    };

    fetchJobs();
  }, [])

  useEffect(()=>{
    {
      selectedCategory == 'All'
        ? setSelectedCatJobList(jobList)
        : setSelectedCatJobList(jobList.filter(job => job.category === selectedCategory))
    }
  }, [selectedCategory])

  return (
    <div className="jobListsDiv">
      {loading ? (
        <div className="loadingDiv">
          <h1>Loading</h1>
        </div>
      ) : selectedCatJobList.length === 0 ? (
        <h1>No Jobs</h1>
      ) : (
        selectedCatJobList.map((job, index) => (
          <div key={index} className="jobListDiv">
            <h3>{job.jobTitle}</h3>
            <img src={job.image} className="jobImage" alt={job.jobTitle} onClick={() => handleImageClick(job)}/>
            <div className="jobDisc">
              <p
                className="jobReq"
                dangerouslySetInnerHTML={{ __html: job.content }}
              ></p>
            </div>
          </div>
        ))
      )}
      {showModal && (
        <SingleJobModal selectedJob={selectedJob} closeModal={closeModal} />
      )}
    </div>
  );
        }  

export default JobLists