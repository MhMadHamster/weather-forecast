import React from 'react';

const Button = props => (
  <button
    onClick={props.onClick}
    className={props.className}
  >
    {props.text}
  </button>
);

Button.defaultProps = {
  onClick: () => {},
  className: '',
  text: 'Button',
};

Button.propTypes = {
  onClick: React.PropTypes.func,
  className: React.PropTypes.string,
  text: React.PropTypes.string,
};

export default Button;
