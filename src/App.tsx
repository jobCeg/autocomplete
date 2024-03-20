import { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteOption } from './components/Autocomplete/Autocomplete';
import { useLazyQuery } from './hooks/useLazyQuery';
import { getUsers } from './features/users/api/getUsers';
import type { QueryFnResponseType, QueryFnType } from './features/users/api/getUsers';
import { mapUserToOption } from './features/users/mappers/mapUserToOption';
import './App.css';

function App() {
  const [selected, setSelected] = useState<null | AutocompleteOption>(null);
  const { abort, data, loading, fetch } = useLazyQuery<QueryFnType, QueryFnResponseType>({
    queryFn: getUsers,
  });

  useEffect(() => {
    fetch();
    return () => {
      abort();
    };
  }, [fetch, abort]);

  const options = (data || []).map(mapUserToOption);

  const onSelect = (selected: AutocompleteOption) => {
    setSelected(selected);
  };

  return (
    <div data-testid="app">
      <h2>Autocomplete</h2>
      <Autocomplete
        label="User"
        loading={loading}
        onSelect={onSelect}
        options={options}
        placeholder="Select a users..."
      />
      <h4>Selected User:</h4>
      <pre>{JSON.stringify(selected)}</pre>
    </div>
  );
}

export default App;
