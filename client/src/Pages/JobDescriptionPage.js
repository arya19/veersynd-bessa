import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JobDescriptionPage = () => {
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState("");
  const [resumePoints, setResumePoints] = useState("");
  const [jobDescriptionfile, setJobDescriptionfile] = useState(null);
  const [isFile, setIsFile] = useState(false);

  const handleFileChange = (event) => {
    setJobDescriptionfile(event.target.files[0]);
  };

  const handleToggle = (event) => {
    setIsFile(!isFile);
    setJobDescription("");
  };

  const handleSubmit = async () => {
    if (isFile && !jobDescriptionfile) {
      alert("Please provide a job description file.");
      return;
    }
    if (!isFile && !jobDescription) {
      alert("Please provide a job description.");
      return;
    }
    if (!resumePoints) {
      alert("Please provide resume points");
      return;
    }
    const formData = new FormData();
    !isFile && formData.append("jobDescription", jobDescription);
    if (isFile && jobDescriptionfile) {
      formData.append("jobDescriptionfile", jobDescriptionfile);
    }
    formData.append("resumePoints", resumePoints);
    for (let keyValue of formData.entries()) {
      console.log(keyValue);
    }
    // console.log(formData);
    try {
      const response = await fetch("http://127.0.0.1:5000/upload_files", {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("Response:", data);
        if (data) {
          navigate("/generated-data", { state: { data: data } });
        }
        // Navigate to the next page with the generated data (if needed)
      } else {
        console.error("Failed to send data.");
      }
    } catch (error) {
      alert("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Job Description Input</h2>
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          id="isFile"
          onChange={handleToggle}
        />
        <label class="form-check-label" for="flexSwitchCheckDefault">
          Is Job Description a file?
        </label>
      </div>
      {!isFile && (
        <div className="mb-3">
          <label htmlFor="jobDescription" className="form-label">
            Enter Job Description
          </label>
          <textarea
            id="jobDescription"
            className="form-control"
            placeholder="Type job description here..."
            rows="5"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
      )}
      {isFile && (
        <div className="mb-3">
          <label htmlFor="fileUpload" className="form-label">
            Upload Job Description Document (TXT)
          </label>
          <input
            type="file"
            className="form-control"
            id="fileUpload"
            accept=".txt"
            onChange={handleFileChange}
          />
        </div>
      )}
      <div>
        <label htmlFor="resumePoints" className="form-label">
          Enter Resume Points
        </label>
        <textarea
          id="resumePoints"
          className="form-control"
          placeholder="Type resume points here..."
          rows="5"
          value={resumePoints}
          onChange={(e) => setResumePoints(e.target.value)}
        />
      </div>
      <button className="btn btn-primary w-100" onClick={handleSubmit}>
        Generate
      </button>
    </div>
  );
};

export default JobDescriptionPage;
