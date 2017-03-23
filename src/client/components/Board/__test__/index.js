import React from 'react';
import should from 'should';
import { shallow } from 'enzyme';
import { Col } from 'react-bootstrap';
import { BoardPanel, Board, Cell, Message } from '../';

const { describe, it } = global;
const state = {
  board: ['x', 'x', 'x'],
  currentPlayer: { name: 'Toto' }, 
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

  it('should render a <Cell/>', () => {
    const text = shallow(<Cell piece='X' />).childAt(0).text();
    should(text).eql('X');
  });

  it('should render an empty <Cell/>', () => {
    const text = shallow(<Cell />).childAt(0).text();
    should(text).eql('\u00a0');
  });

});
