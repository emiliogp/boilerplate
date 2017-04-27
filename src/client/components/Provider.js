import React  from 'react';
import PropTypes  from 'prop-types';

class Provider extends React.Component {
  getChildContext() {
    const { store } = this.props;
    return { store };
  }

  render() {
    const { children } = this.props;
    return children;
  }

};

Provider.childContextTypes = {
  store: PropTypes.object,
};


export default Provider;
