import React, { useState } from 'react';

const Questions = () => {
  const [context, setContext] = useState('');
  const [method, setMethod] = useState('Wordnet');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/generate_question', {
        method: 'POST',
        body: JSON.stringify({
          context,
          answer: '',  // Adjust this if needed based on your backend expectation
          radiobutton: method
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    }
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
      <h1>Question and Answer Generation</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="context">Context:</label>
        <textarea
          id="context"
          name="context"
          rows="10"
          cols="50"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          style={{ backgroundColor: 'black', color: 'white', border: '1px solid white' }}
        ></textarea>
        <br />
        <br />
        <label>Select method for generating distractors:</label>
        <br />
        <input
          type="radio"
          id="wordnet"
          name="radiobutton"
          value="Wordnet"
          checked={method === 'Wordnet'}
          onChange={() => setMethod('Wordnet')}
          style={{ backgroundColor: 'black', color: 'white' }}
        />
        <label htmlFor="wordnet" style={{ color: 'white' }}>Wordnet</label>
        <br />
        <input
          type="radio"
          id="sense2vec"
          name="radiobutton"
          value="Sense2Vec"
          checked={method === 'Sense2Vec'}
          onChange={() => setMethod('Sense2Vec')}
          style={{ backgroundColor: 'black', color: 'white' }}
        />
        <label htmlFor="sense2vec" style={{ color: 'white' }}>Sense2Vec</label>
        <br />
        <br />
        <button type="submit" style={{ backgroundColor: 'white', color: 'black', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>Generate Question</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div id="output" style={{ marginTop: '20px', color: 'white' }}>{output}</div>
    </div>
  );
};

export default Questions;
