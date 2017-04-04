import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './history.css';

const Status = ({ round }) => (
  <div className="status">
    <span>{`Round: ${round}`}</span>
  </div>
);

Status.propTypes = {
  round: React.PropTypes.number,
};

const TiedRound = ({ id }) => (
  <Row className="round">
    <Col xs={2} className="id">
      {id}
    </Col>
    <Col xs={7} className="winner">
      No Winner
    </Col>
  </Row>
);
TiedRound.propTypes = {
  id: React.PropTypes.number.isRequired,
};

const WinnedRound = ({ id, name }) => (
  <Row className="round">
    <Col xs={2} className="id">
      {id}
    </Col>
    <Col xs={7} className="winner">
      {name}
    </Col>
    <Col xs={2} className="thumb">
      <i className="fa fa-thumbs-o-up" />
    </Col>
  </Row>
);

WinnedRound.propTypes = {
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.number.isRequired,
};

const Round = ({ round }) => {
  if (round.winner) return <WinnedRound id={round.id} name={round.winner.name} />;
  return <TiedRound id={round.id} />;
};

Round.propTypes = {
  round: React.PropTypes.object.isRequired,
};

const History = ({ history }) => (
  <Grid className="history">
    {history.slice(-20).reverse().map((round, i) => <Round round={round} key={i} />)}
  </Grid>
);

History.propTypes = {
  history: React.PropTypes.array,
};


export const HistoryPanel = ({ history }) => {
  const nextRound = (history && history.length + 1) || 0;
  return (
    <Grid>
      <Row>
        <Status round={nextRound} />
      </Row>
      <Row>
        <History history={history} />
      </Row>
    </Grid>
  );
};

HistoryPanel.propTypes = {
  history: React.PropTypes.array,
};
