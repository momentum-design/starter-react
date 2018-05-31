import React, { Fragment } from 'react';

import Hero from '../shared/Hero';

const HomePage = () => {
  return (
    <Fragment>
      <Hero title="Get Started" description="Add your content below." textAlign="left" />
      <div className="row">
        <p>
          Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nulla quis varius elit. Vestibulum vel pellentesque
          lectus. Mauris vitae rutrum sapien, in scelerisque metus. Duis eget
          ullamcorper ex, non consectetur orci. Sed et diam massa. Donec nec
          purus ex. Nunc diam dui, tempus ut blandit nec, aliquam vitae elit.
        </p>
      </div>
    </Fragment>
  );
};

export default HomePage;
