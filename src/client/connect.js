import React from 'react';

export const connect = mapsDispatchToProps => Component => {
  class Connector extends React.Component {
    componentWillMount() {
      const { store } = this.props;
      store.listen( state => this.forceUpdate());
    }

    render() {
      const { store } = this.props;
      const { dispatch, getState } = store;
      const props = { ...getState(), ...mapsDispatchToProps(dispatch) };
      return <Component {...props} />
    }
  };

  Connector.propTypes = {
    store: React.PropTypes.object.isRequired,
  };

  return Connector;
};


