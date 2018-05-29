import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from './index';

describe('<NotFoundPage />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<NotFoundPage />);
    expect(container).toMatchSnapshot();
  });

  it('should have a header called \'404 Not Found\'', () => {
    const wrapper = shallow(<NotFoundPage />);
    const actual = wrapper.find('.cui-panel__title').text();
    const expected = '404 Not Found';

    expect(actual).toEqual(expected);
  });

  it('should have a message with \'The page you requested cannot be found.\'', () => {
    const wrapper = shallow(<NotFoundPage />);
    const actual = wrapper.find('.cui-panel__message').text();
    const expected = 'The page you requested cannot be found.';

    expect(actual).toEqual(expected);
  });

  it('should link to an home', () => {
    const wrapper = shallow(<NotFoundPage />);
    const actual = wrapper.findWhere(n => n.prop('to') === '/').length;
    const expected = 1;

    expect(actual).toEqual(expected);
  });

  it('should have footer content', () => {
    const wrapper = shallow(<NotFoundPage />);
    const actual = wrapper.find('.footer__copyright').text();
    const expected = '© 2018 Cisco and/or affiliates. All rights reserved.';

    expect(actual).toEqual(expected);
  });
});
