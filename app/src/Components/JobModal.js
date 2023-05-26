import React, { useEffect, useState } from 'react';
import './jobModal.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const JobModal = ({ selectedJob, onClose, onSave }) => {

  const categoriesArray = ['React', 'Laravel', 'Python', 'React Native'];

  console.log('selectedJob ', selectedJob)

  const [image, setImage] = useState(selectedJob ? selectedJob.image : '');
  const [jobTitle, setJobTitle] = useState(selectedJob ? selectedJob.jobTitle : '');
  const [category, setCategory] = useState(selectedJob ? selectedJob.category : '');
  const [content, setContent] = useState(selectedJob ? selectedJob.content : '');

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedJob) {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/jobs/${selectedJob.id}`, {
          image: image,
          jobTitle: jobTitle,
          category: category,
          content: content,
        });
        if(response.status == 200 || 201){
          onSave(
            {
            id: selectedJob.id,
            image: image,
            jobTitle: jobTitle,
            category: category,
            content: content,})
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/jobs', {
          image: image,
          jobTitle: jobTitle,
          category: category,
          content: content,
        });
        if(response.status == 200 || 201){
          onSave(
            {
            id: response.data?.jobId,
            image: image,
            jobTitle: jobTitle,
            category: category,
            content: content,})
        }
      } catch (error) {
        console.error(error);
      }
    }
    onClose();
  };

  const [disableJobBtn, setDisableJobBtn] = useState(true)

  useEffect(()=>{
    console.log('category ', category)
    {(image == '' || jobTitle == '' || category == '' || content == '') ? setDisableJobBtn(true) : setDisableJobBtn(false)  }
  }, [image, jobTitle, category, content])

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{selectedJob ? 'Edit Job' : 'Add New Job'}</h3>
        <form className="editJobForm">
          <input
            type="text"
            name="image"
            value={image}
            onChange={(e)=> setImage(e.target.value)}
            placeholder="Image URL"
            required
          />
          <input
            type="text"
            name="jobTitle"
            value={jobTitle}
            onChange={(e)=> setJobTitle(e.target.value)}
            placeholder="Job Title"
            required
          />
          <select
            name="category"
            value={category}
            onChange={(e)=> setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categoriesArray.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <ReactQuill value={content} onChange={handleContentChange} />
          <div className="modal-buttons">
            <button disabled={disableJobBtn} onClick={handleSubmit} type="submit">
              {selectedJob ? 'Save Changes' : 'Add Job'}
            </button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobModal;