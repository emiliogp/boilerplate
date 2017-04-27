import React from 'react';
import PropTypes  from 'prop-types';

class Connect extends React.Component {
  componentWillMount() {
    const { store } = this.context;
    store.listen( state => this.forceUpdate());
  }

  render() {
    const { store } = this.context;
    const { children } = this.props;
    return children(store);
  }
};

Connect.contextTypes = {
  store: PropTypes.object.isRequired,
};

Connect.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Connect;



