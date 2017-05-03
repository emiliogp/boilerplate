import React from 'react';
import should from 'should';
import { shallow } from 'enzyme';
import { Col } from 'react-bootstrap';
import { BoardPanel, Board, Cell, PlayedCell, DeadCell, ClickableCell, Fruit, Message } from '../';
import { X } from '../../../game';

const { describe, it } = global;
const state = {
  board: [X, X, X],
  currentPlayer: { name: 'Toto' }, 
  onPlay(){},
};

describe('<Board/>', () => {
  it('should render a <Cell/>', () => {
    should(shallow(<Board {...state} />).find(Cell)).have.length(3);
  });

  it('should render a <Message/>', () => {
    const text = shallow(<Message {...state} />).find('span').text();
    should(text).match(new RegExp(state.currentPlayer.name));
  });

  it('should render a <BoardPanel/>', () => {
    should(shallow(<BoardPanel {...state} />).find(Message)).have.length(1);
    should(shallow(<BoardPanel {...state} />).find(Board)).have.length(1);
  });

  it('should render a <DeadCell/>', () => {
    should(shallow(<Cell piece='X' />).find(DeadCell)).have.length(1);
  });

  it('should render a <DeadCell/>', () => {
    should(shallow(<Cell currentPlayer={{ isComputer: true }} />).find(DeadCell)).have.length(1);
  });

  it('should render a <ClickableCell/>', () => {
    should(shallow(<Cell currentPlayer={{}} />).find(ClickableCell)).have.length(1);
  });

  it('should render a <PlayedCell/>', () => {
    should(shallow(<Cell piece={X} />).find(PlayedCell)).have.length(1);
  });


});
