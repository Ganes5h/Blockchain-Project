import React, { useState } from 'react';
import axios from 'axios';

const CertificateGenerator = () => {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [grade, setGrade] = useState('');

  const handleGenerate = async () => {
    const response = await axios.post('http://localhost:5000/generate', {
      student_id: studentId,
      name: name,
      course: course,
      grade: grade,
    });
    alert(response.data.message);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Generate Certificate</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="studentId" className="block text-gray-700 font-bold mb-2">Student ID</label>
          <input
            id="studentId"
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="course" className="block text-gray-700 font-bold mb-2">Course</label>
          <input
            id="course"
            type="text"
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="grade" className="block text-gray-700 font-bold mb-2">Grade</label>
          <input
            id="grade"
            type="text"
            placeholder="Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="input-field"
          />
        </div>
        <button onClick={handleGenerate} className="generate-button">Generate</button>
      </form>
    </div>
  );
};

export default CertificateGenerator;
