import React from 'react';

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <ul style={{
             color: 'white' ,
             paddingTop:'6rem' , 
             position:'sticky',
             overflowY:'auto',
             listStyle: 'none'
        }}>
          <li style={{ padding: '1rem' }}><a href="new">Create new</a></li>
          <li style={{ padding: '1rem' }}><a href="/jobs">Jobs</a></li>
          <li style={{ padding: '1rem' }}><a href="/candidate">Candidates</a></li>
          <li style={{ padding: '1rem' }}><a href="/interview">Interview</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;