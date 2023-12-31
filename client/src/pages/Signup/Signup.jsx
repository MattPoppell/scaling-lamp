import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations'


import './Signup.css'; // 

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data: userData } = await addUser({
        variables: { ...formState },
      });

      Auth.login(userData.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="signup-container">
      <div className="signup-card">
        <h4 className="signup-header">Sign Up</h4>
        <div className="signup-body">
          {data ? (
            <p>
              Success....{' '}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your username"
                name="username"
                type="text"
                value={formState.name}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="submit-btn" type="submit">
                Submit
              </button>
            </form>
          )}

          {error && (
            <div className="error-message">
              {error.message}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Signup;
