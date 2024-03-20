import type { AutocompleteOption } from '../../../components/Autocomplete/Autocomplete';
import type { User } from '../types';

export const mapUserToOption = (user: User): AutocompleteOption => ({
  label: user.name,
  value: user.id,
});
