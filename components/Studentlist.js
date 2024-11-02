import React from 'react'

const studentlist = () => {
  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Student List</h2>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            {student.firstName} {student.lastName} - Grade: {student.grade}, DOB: {student.dob}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default studentlist