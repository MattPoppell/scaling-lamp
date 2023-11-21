import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';
import Auth from '../../utils/auth';
import './CommentForm.css'; 

const CommentForm = ({ venueId }) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          venueId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className="comment-form-container">
      <h4>What are your thoughts about this Venue?</h4>

      {Auth.loggedIn() ? (
        <>
          <p className={`character-count ${characterCount === 280 || error ? 'text-danger' : ''}`}>
            Character Count: {characterCount}/280
            {error && <span className="error-message ml-2">{error.message}</span>}
          </p>
          <form onSubmit={handleFormSubmit}>
            <textarea
              name="commentText"
              placeholder="Add your comment..."
              value={commentText}
              className="form-input"
              style={{ lineHeight: '1.5', resize: 'vertical' }}
              onChange={handleChange}
            ></textarea>
            <button className="btn btn-primary" type="submit">
              Add Comment
            </button>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CommentForm;