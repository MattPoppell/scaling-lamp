import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import VenueForm from '../../components/VenueForm';
import VenueList from '../../components/VenueList';

import { QUERY_USER, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';
import './Profile.css';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
 
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4 className="login-message">
      You need to be logged in to see this. Use the navigation links above to sign up or log in!
    </h4>
     
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
        <h3>${user.username} </h3>
        <br/>
        <h3>${user.email}</h3>
        <br/>
        

        <div className="col-12 col-md-10 mb-5">
          <VenueList
            venues={user.venues}
            title={`${user.username}'s contributions`}
            showTitle={false}
            showUsername={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
