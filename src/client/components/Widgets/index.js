import React from 'react';
import PropTypes from 'prop-types';
import './widgets.css';

export const Icon = ({ fruit }) => {
  if (!fruit) return <div/>;
  const { icon, color } = fruit;
  return (
    <div className='title-icon' style={{ color }}>
      <i className={`fa fa-${icon}`} />
    </div>
  );
};

Icon.propTypes = {
  fruit: PropTypes.object,
};

export const Title = ({ name }) => (
  <div className='title'>
    <span>{name}</span>
  </div>
);

Title.propTypes = {
  name: PropTypes.string.isRequired,
};
