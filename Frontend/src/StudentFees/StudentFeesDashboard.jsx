import React from 'react';

function StudentFeesDashboard() {
  return (
    <div style={{ padding: '2rem', background: '#fffbe6', minHeight: '100vh' }}>
      <h1 style={{ color: '#bfa700', marginBottom: '1rem' }}>Student Fees Dashboard</h1>
      <p style={{ fontSize: '1.2rem', color: '#333' }}>
        This is a dummy dashboard for managing student fees. <br />
        Here you can view, add, and update student fee records.
      </p>
      <div style={{ marginTop: '2rem', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px #ffe066', padding: '2rem' }}>
        <ul>
          <li>View all student fee records</li>
          <li>Add new fee entry</li>
          <li>Update existing fee details</li>
          <li>Delete fee records</li>
        </ul>
      </div>
    </div>
  );
}

export default StudentFeesDashboard;
