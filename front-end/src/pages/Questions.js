import React, { useState } from 'react';

const Questions = () => {
  const [context, setContext] = useState('');
  const [method, setMethod] = useState('Wordnet');
  const [questions, setQuestions] = useState([]);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5002/generate_question', {
        method: 'POST',
        body: JSON.stringify({
          context,
          radiobutton: method,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Response data:', data);

      // Extract questions and summary from data
      const { questions, summary } = data;

      // Initialize questions with mixed options including the correct answer
      const questionsWithMixedOptions = questions.map(question => {
        const mixedOptions = mixOptions(question.answer, question.distractors);
        return {
          ...question,
          options: mixedOptions,
          selectedOption: null,
        };
      });

      // Update state with questions and summary
      setQuestions(questionsWithMixedOptions);
      setSummary(summary);
      setError(''); // Clear any previous error
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    }
  };

  const mixOptions = (answer, distractors) => {
    // Capitalize the first letter of the answer
    const capitalizedAnswer = answer.charAt(0).toUpperCase() + answer.slice(1);
  
    // Shuffle distractors array
    const shuffledDistractors = [...distractors].sort(() => Math.random() - 0.5);
  
    // Insert the capitalized answer at a random index
    const randomIndex = Math.floor(Math.random() * (shuffledDistractors.length + 1));
    shuffledDistractors.splice(randomIndex, 0, capitalizedAnswer);
  
    return shuffledDistractors;
  };
  
  const handleAnswerSelection = (questionIndex, selectedOption) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].selectedOption = selectedOption;
    setQuestions(updatedQuestions);
  };

  const handleSubmission = () => {
    // Example logic for handling submission
    questions.forEach((question, index) => {
      console.log(`Question ${index + 1}: Answer selected - ${question.selectedOption}`);
      // Add your logic for correct/incorrect handling here
    });
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
        />
        <label htmlFor="sense2vec" style={{ color: 'white' }}>Sense2Vec</label>
        <br />
        <br />
        <button type="submit" style={{ backgroundColor: 'white', color: 'black', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>
          Generate Question
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div id="output" style={{ marginTop: '20px', color: 'white' }}>
        {questions.length > 0 && questions.map((question, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <b style={{ color: 'white' }}>{question.question}</b>
            <br />
            {question.selectedOption ? (
              question.selectedOption.toLowerCase() === question.answer.toLowerCase()  ? (
                <b style={{ color: 'green' }}>Correct! Ans: {question.answer}</b>
              ) : (
                <b style={{ color: 'red' }}>Incorrect! Ans: {question.answer}</b>
              )
            ) : (
              question.options.map((option, idx) => (
                <label key={idx} style={{ color: 'white', display: 'block', marginTop: '5px' }}>
                  <input
                    type="radio"
                    value={option}
                    checked={question.selectedOption === option}
                    onChange={() => handleAnswerSelection(index, option)}
                  />
                  <span style={{ marginLeft: '5px' }}>{option}</span>
                </label>
              ))
            )}
          </div>
        ))}
        {questions.length > 0 && (
          <button onClick={handleSubmission} style={{ backgroundColor: 'white', color: 'black', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>
            Submit Answers
          </button>
        )}
      </div>
    </div>
  );
};

export default Questions;
