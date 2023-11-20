import { useLocation, useNavigate } from 'react-router-dom';
import './Footer.css'; 

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <footer className="main-footer">
      <div className="footer-content">
        {location.pathname !== '/' && (
          <button className="back-btn" onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        )}
        <h4 className="made-with">
          Made by future software developers with{' '}
          <span role="img" aria-label="heart">
            ❤️
          </span>{' '}
          by the MSDZ.
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
