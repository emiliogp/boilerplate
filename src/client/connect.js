import React from 'react';
import PropTypes  from 'prop-types';

export const connect = mapsDispatchToProps => Component => {
  class Connector extends React.Component {
    componentWillMount() {
      const { store } = this.context;
      store.listen( state => this.forceUpdate());
    }

    render() {
      const { store } = this.context;
      const { dispatch, getState } = store;
      const props = { ...getState(), ...mapsDispatchToProps(dispatch) };
      return <Component {...props} />
    }
  };

  Connector.contextTypes = {
    store: PropTypes.object.isRequired,
  };

  return Connector;
};


