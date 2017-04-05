import should from 'should';
import { isStatusOver, GAME_OVER, GAME_RUNNING } from '../game';
import App from '../components/App';

describe('game', function() {
  describe('isStatusOver', function() {
    it('should be over', () => {
      should(isStatusOver(GAME_OVER)).be.true();
    });

    it('should not be over', () => {
      should(isStatusOver(GAME_RUNNING)).be.false();
    });
  });
});
