import { WHITNEY_DONNELLY } from '../../../../__mocks__/users';
import { mapUserToOption } from '../mapUserToOption';

describe('mapUserToOption', () => {
  it('should map user to autocomplete option', () => {
    expect(mapUserToOption(WHITNEY_DONNELLY)).toEqual({
      label: WHITNEY_DONNELLY.name,
      value: WHITNEY_DONNELLY.id,
    });
  });
});
