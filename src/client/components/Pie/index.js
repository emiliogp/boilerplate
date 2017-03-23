import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PieChart from 'react-svg-piechart';
import './pie.css';

const getWins = (fct, history) => history.filter(({ winner }) => fct(winner)).length;

export class PiePanel extends React.Component {
  state = { expandedSector: null }
  handleMouseEnterOnSector = sector => this.setState({ expandedSector: sector })
  render() {
    const { player, history } = this.props;
    const { expandedSector } = this.state;
    const [computerWins, ties, playerWins] = [
      getWins(x => x && x.isComputer, history),
      getWins(x => !x, history),
      getWins(x => x && !x.isComputer, history),
    ];
    const total = computerWins + ties + playerWins;
    if (!total) return null;
    const data = [
      { label: 'Tie', value: ties, color: '#3b5998' },
      { label: player.name, value: playerWins, color: '#00aced' },
      { label: 'Computer', value: computerWins, color: '#dd4b39' },
    ].filter(x => x.value);;
    return (
      <Row className='pie-chart'>
        <Col xs={12} className='legend'>
          {
            data.map((d, i) => (
              <span key={ i }>
                <i className='bullet fa fa-circle' style={{ color: d.color }} />
                <span className='name' style={{ fontWeight: this.state.expandedSector === i ? 'bold' : null }}>
                  {d.label} : {d.value}
                </span>
              </span>
            ))
          }
        </Col>
        <Col xs={12} className='pie'>
          <PieChart
            data={data}
            expandOnHover={true}
            expandedSector={expandedSector}
            onSectorHover={this.handleMouseEnterOnSector}
          />
        </Col>

      </Row>
    );
  }
}

PiePanel.propTypes = {
  player: React.PropTypes.object.isRequired,
  history: React.PropTypes.array.isRequired,
};

