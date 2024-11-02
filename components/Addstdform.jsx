"use client";

import { useState, useEffect } from "react";

const Addstdform = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    grade: "",
  });
  const [message, setMessage] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:3001/students");
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        setMessage("Failed to fetch students");
      }
    } catch (error) {
      setMessage(`Failed to fetch students: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = selectedStudent
        ? `http://localhost:3001/students/${selectedStudent.id}`
        : "http://localhost:3001/students";
      const method = selectedStudent ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage(selectedStudent ? "Student updated successfully" : "Student added successfully");
        setFormData({
          firstName: "",
          lastName: "",
          dob: "",
          grade: "",
        });
        setSelectedStudent(null);
        await fetchStudents(); 
      } else {
        setMessage("Failed to submit data");
      }
    } catch (error) {
      setMessage(`Failed to submit data: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      dob: student.dob,
      grade: student.grade,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">{selectedStudent ? "Edit Student" : "Add Student"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dob" className="block text-sm font-medium text-gray-600">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="grade" className="block text-sm font-medium text-gray-600">
            Grade
          </label>
          <input
            type="number"
            id="grade"
            name="grade"
            value={formData.grade}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600">
            {selectedStudent ? "Update Student" : "Register"}
          </button>
        </div>
      </form>
      {message && <div className="mt-4 text-center text-red-400">{message}</div>}

      {/* List of students */}
      <div className="mt-8">
        <h3 className="text-xl mb-4">Student List</h3>
        <ul>
          {students.map((student) => (
            <li key={student.id} className="mb-2">
              {student.firstName} {student.lastName} - Grade: {student.grade}
              <button
                onClick={() => handleEdit(student)}
                className="ml-4 text-blue-500 underline"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Addstdform;
