import React from 'react';
import PropTypes from 'prop-types';

class Hero extends React.PureComponent {
  static displayName = 'Hero';

  render() {
    const {
      title,
      description,
      // image,
      textAlign,
      textColor,
      color,
    } = this.props;
    const leadElement = () => {
      return description ? <h3 className="hero__lead">{description}</h3> : '';
    };

    return (
      <div
        className={
          'hero ' +
          (textAlign === 'center' ? 'text-center' : 'hero--fluid') +
          ' ' +
          (textAlign === 'left' ? 'page-header--left' : '') +
          ' ' +
          (textColor === 'light' ? 'hero--dark' : '')
        }
        style={{ backgroundColor: color }}>
        <div
          className={
            'page-header__container ' +
            (textAlign === 'left' ? 'page-header--left' : '')
          }>
          <h1 className="hero__title">{title}</h1>
          {leadElement()}
        </div>
      </div>
    );
  }
}

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  textAlign: PropTypes.string,
  textColor: PropTypes.string,
  color: PropTypes.string,
};

Hero.defaultProps = {
  description: '',
  image: '',
  textAlign: '',
  textColor: '',
  color: '',
};

export default Hero;
