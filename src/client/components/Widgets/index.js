import React from 'react';
import './widgets.css';

export const Icon = ({ type }) => (
  <div className="title-icon">
    <i className={`fa fa-${type}`} />
  </div>
);

Icon.propTypes = {
  type: React.PropTypes.string.isRequired,
};

export const Title = ({ name }) => (
  <div className="title">
    <span>{name}</span>
  </div>
);

Title.propTypes = {
  name: React.PropTypes.string.isRequired,
};
