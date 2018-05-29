import React from 'react';
import { mount, shallow } from 'enzyme';
import HomePage from './index';

describe('<HomePage />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<HomePage />);
    expect(container).toMatchSnapshot();
  });

  it('should have a header called \'Get Started\'', () => {
    const wrapper = mount(<HomePage />);
    const actual = wrapper.find('h1').text();
    const expected = 'Get Started';

    expect(actual).toEqual(expected);
  });

  it('should have a sub-header with \'hero__lead\' class', () => {
    const wrapper = mount(<HomePage />);
    const actual = wrapper.find('h3').prop('className');
    const expected = 'hero__lead';

    expect(actual).toEqual(expected);
  });

  it('should lorem ipsum content', () => {
    const wrapper = shallow(<HomePage />);
    const actual = wrapper.find('p').text();
    const expected = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis varius elit. Vestibulum vel pellentesque lectus. Mauris vitae rutrum sapien, in scelerisque metus. Duis eget ullamcorper ex, non consectetur orci. Sed et diam massa. Donec nec purus ex. Nunc diam dui, tempus ut blandit nec, aliquam vitae elit.';

    expect(actual).toEqual(expected);
  });
});
