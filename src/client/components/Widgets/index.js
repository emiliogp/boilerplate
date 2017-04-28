import React from 'react';
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
  fruit: React.PropTypes.object,
};

export const Title = ({ name }) => (
  <div className='title'>
    <span>{name}</span>
  </div>
);

Title.propTypes = {
  name: React.PropTypes.string.isRequired,
};
