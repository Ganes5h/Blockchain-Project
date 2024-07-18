import React, { useState } from 'react';
import axios from 'axios';

const CertificateValidator = () => {
  const [certificateId, setCertificateId] = useState('');
  const [certificate, setCertificate] = useState(null);

  const handleValidate = async () => {
    const response = await axios.get(`http://localhost:5000/validate/${certificateId}`);
    setCertificate(response.data.certificate);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Validate Certificate</h2>
      <input
        type="text"
        placeholder="Certificate ID"
        value={certificateId}
        onChange={(e) => setCertificateId(e.target.value)}
        className="input-field"
      />
      <button onClick={handleValidate} className="validate-button">
        Validate
      </button>
      {certificate && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Certificate Details</h3>
          <p className="mt-2"><span className="font-semibold">ID:</span> {certificate.ID}</p>
          <p className="mt-2"><span className="font-semibold">Name:</span> {certificate.Name}</p>
          <p className="mt-2"><span className="font-semibold">Course:</span> {certificate.Course}</p>
          <p className="mt-2"><span className="font-semibold">Grade:</span> {certificate.Grade}</p>
        </div>
      )}
    </div>
  );
};

export default CertificateValidator;
