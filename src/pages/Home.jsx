import React from 'react';
import { Link } from 'react-router-dom';
import Gallery from '../components/gallery/Gallery';

function Home() {
  return (
    <div className="home">
      <main className="home-main">
        <Gallery isFavourite={false} />
      </main>
      <div id="modal-root"></div>
    </div>
  );
}

export default Home;
