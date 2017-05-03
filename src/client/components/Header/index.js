import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import './header.css';

export const PlayerPreview = ({ player: { name } }) => (
  <Col className='player-preview text-nowrap text-right'>
    <em >{`player: ${name}`}</em>
  </Col>
);

PlayerPreview.propTypes = {
  player: PropTypes.object.isRequired,
};

export const Header = ({ children, player }) => {
  const headerLeft = () => {
    return React.Children.toArray(children).find(child => child.type === HeaderLeft);
  };

  const headerRight = () => {
    return React.Children.toArray(children).find(child => child.type === HeaderRight);
  };

  return (
    <div>
      <Row className='header'>
        {headerLeft()}
        {headerRight()}
      </Row>
      <Row>
        <hr/>
      </Row>
      <Row>
        <PlayerPreview player={player}/>
      </Row>
    </div>
  );
};

Header.propTypes = {
  player: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export const HeaderLeft = ({ children }) => (
  <Col xs={6} className='header-left text-nowrap text-left'>
    {children}
  </Col>
);

HeaderLeft.propTypes = {
  children: PropTypes.node,
};

export const HeaderRight = ({ children }) => (
  <Col xs={6} className='header-right text-nowrap text-right'>
    {children}
  </Col>
);

HeaderRight.propTypes = {
  children: PropTypes.node,
};


