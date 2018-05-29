import React, { Fragment } from 'react';
import Hero from '../shared/Hero';

// Since this component is simple and static, there's no parent container for it.
const BlogPage = () => {
  return (
    <Fragment>
      <Hero title="Blog" description="Add your content below." textAlign="left" />
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

export default BlogPage;
