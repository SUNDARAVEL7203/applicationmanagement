import React from 'react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
const App = () =>  {
  const [applicants, setApplicants] = useState([]);
  const [newApplicant, setNewApplicant] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [currentApplicantIndex, setCurrentApplicantIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const addApplicant = () => {
      if (newApplicant.trim() !== "") {
          setApplicants([...applicants, { name: newApplicant, documents: [] }]);
          setNewApplicant("");
          setCurrentApplicantIndex(applicants.length);
      }
  };

  const deleteApplicant = (index) => {
      setApplicants(applicants.filter((_, i) => i !== index));
      setCurrentApplicantIndex(0);
  };

  const addDocument = (index) => {
      if (selectedFile) {
          let updatedApplicants = [...applicants];
          updatedApplicants[index].documents.push(selectedFile.name);
          setApplicants(updatedApplicants);
          setSelectedFile(null);
      }
  };

  const nextApplicant = () => {
      if (currentApplicantIndex < applicants.length - 1) {
          setCurrentApplicantIndex(currentApplicantIndex + 1);
      }
  };

  const prevApplicant = () => {
      if (currentApplicantIndex > 0) {
          setCurrentApplicantIndex(currentApplicantIndex - 1);
      }
  };

  return (
    <div className="container mt-4 application-container">
            <h2 className="title">Application Management System</h2>
            
            <div className="mb-3 shadow-box">
                <input 
                    type="text" 
                    className="form-control input-field" 
                    placeholder="Enter applicant name" 
                    value={newApplicant} 
                    onChange={(e) => setNewApplicant(e.target.value)}
                />
                <button className="btn btn-primary mt-2 add-btn" onClick={addApplicant}>Add Applicant</button>
            </div>
            
            {applicants.length > 0 && (
                <div className="applicant-card shadow-box">
                    <h5>{applicants[currentApplicantIndex].name} 
                        <button className="btn btn-danger btn-sm float-end delete-btn" onClick={() => deleteApplicant(currentApplicantIndex)}>Delete</button>
                    </h5>
                    <button className="btn btn-secondary btn-sm upload-btn" onClick={() => setSelectedApplicant(currentApplicantIndex)}>Upload Document</button>
                    
                    <ul className="mt-3 document-list">
                        {applicants[currentApplicantIndex].documents.map((doc, i) => (
                            <li key={i}>{doc}</li>
                        ))}
                    </ul>
                    <div className="nav-buttons">
                        <button className="btn btn-outline-primary" onClick={prevApplicant} disabled={currentApplicantIndex === 0}>Back</button>
                        <button className="btn btn-outline-primary" onClick={nextApplicant} disabled={currentApplicantIndex === applicants.length - 1}>Next</button>
                    </div>
                </div>
            )}

            {selectedApplicant !== null && (
                <div className="modal d-block overlay">
                    <div className="modal-dialog">
                        <div className="modal-content p-3 modal-box">
                            <h4>Add Document</h4>
                            <input 
                                type="file" 
                                className="form-control input-field" 
                                onChange={(e) => setSelectedFile(e.target.files[0])}
                            />
                            <button className="btn btn-primary mt-2 save-btn" onClick={() => { addDocument(selectedApplicant); setSelectedApplicant(null); }}>Save</button>
                            <button className="btn btn-secondary mt-2 ms-2 cancel-btn" onClick={() => setSelectedApplicant(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
  
}

export default App