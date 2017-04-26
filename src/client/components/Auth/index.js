import React from 'react';
import LoginForm from '../LoginForm';

const Auth = ({ user, onAuth, children }) => {
  if (user) return children;
  return <LoginForm onAuth={onAuth} />
};

Auth.propTypes = {
  user: React.PropTypes.object,
  onAuth: React.PropTypes.func.isRequired,
  children: React.PropTypes.element,
};

export default Auth;
