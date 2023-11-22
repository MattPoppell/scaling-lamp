import React from 'react';

import { useQuery } from '@apollo/client';

import VenueForm from '../components/VenueForm';
import VenueList from '../components/VenueList';
import SearchForm from '../components/SearchForm';

import { QUERY_VENUES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_VENUES);
  const venues = data?.venues || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          < VenueForm/>
        </div>
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          < SearchForm/>
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <VenueList
              venues={venues}
              title="The Big List"
            />
          )}
        </div>
      </div>
    </main>
  );
};




export default Home;