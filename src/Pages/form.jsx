import { useState, useEffect } from 'react';
import './form.css';

export default function Form() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [message, setMessage] = useState('');

  // Load submissions from localStorage when component mounts
  useEffect(() => {
    const storedSubmissions = localStorage.getItem('formSubmissions');
    if (storedSubmissions) {
      try {
        const parsedSubmissions = JSON.parse(storedSubmissions);
        setSubmissions(parsedSubmissions);
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
      }
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!username || !email || !password) {
      setMessage('Please fill in all fields!');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    // Create new submission object
    const newSubmission = {
      id: Date.now(),
      username,
      email,
      password,
      timestamp: new Date().toLocaleString(),
    };

    // Add to submissions array
    const updatedSubmissions = [...submissions, newSubmission];
    setSubmissions(updatedSubmissions);

    // Store as JSON in localStorage
    localStorage.setItem('formSubmissions', JSON.stringify(updatedSubmissions));

    setMessage('Form submitted successfully!');
    
    // Clear form
    setUsername('');
    setEmail('');
    setPassword('');
    
    setTimeout(() => setMessage(''), 3000);
  };

  // Handle clicking on a submission to fill form
  const handleSelectSubmission = (submission) => {
    setUsername(submission.username);
    setEmail(submission.email);
    setPassword(submission.password);
    setMessage(`Loaded: ${submission.username} (${submission.timestamp})`);
    setTimeout(() => setMessage(''), 3000);
  };

  // Handle deleting a submission
  const handleDeleteSubmission = (id) => {
    const updatedSubmissions = submissions.filter((sub) => sub.id !== id);
    setSubmissions(updatedSubmissions);
    localStorage.setItem('formSubmissions', JSON.stringify(updatedSubmissions));
    setMessage('Submission deleted!');
    setTimeout(() => setMessage(''), 3000);
  };

  // Handle clearing all data
  const handleClearAllData = () => {
    localStorage.removeItem('formSubmissions');
    setSubmissions([]);
    setUsername('');
    setEmail('');
    setPassword('');
    setMessage('All data cleared!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1>User Registration Form</h1>

        {message && <div className="message">{message}</div>}

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>

      {/* {submissions.length > 0 && (
        <div className="data-wrapper">
          <div className="submissions-header">
            <h2>All Submissions ({submissions.length})</h2>
            <button onClick={handleClearAllData} className="clear-all-btn">
              Clear All
            </button>
          </div>

          <div className="json-display">
            <p className="json-label">JSON Format:</p>
            <pre className="json-code">
              {JSON.stringify(submissions, null, 2)}
            </pre>
          </div> */}

          <div className="submissions-list">
            <p className="submissions-label">Click any submission to load it:</p>
            {submissions.map((submission) => (
              <div key={submission.id} className="submission-item">
                <div className="submission-content" onClick={() => handleSelectSubmission(submission)}>
                  <div className="submission-info">
                    <p className="submission-username">{submission.username}</p>
                    <p className="submission-email">{submission.email}</p>
                    <p className="submission-timestamp">{submission.timestamp}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteSubmission(submission.id)}
                  className="delete-btn"
                  title="Delete this submission"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
    </div>
  );
}
