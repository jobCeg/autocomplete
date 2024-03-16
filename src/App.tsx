import './App.css';
import { Autocomplete } from './components/Autocomplete/Autocomplete';
import { useLazyQuery } from './hooks/useLazyQuery';
import { getUsers } from './features/users/api/getUsers';
import type { QueryFnResponseType, QueryFnType } from './features/users/api/getUsers';

function App() {
  const { abort, data, loading, fetch } = useLazyQuery<QueryFnType, QueryFnResponseType>({
    queryFn: getUsers,
  });

  return (
    <div data-testid="app">
      <h2>Autocomplete</h2>
      <h3>{loading && <p>Loading...</p>}</h3>
      <Autocomplete />
      <ul>{!!data && data.slice(0, 5).map((user) => <li key={user.id}>{user.name}</li>)}</ul>

      <button onClick={() => fetch({ body: '' })}>fetch</button>
      <button onClick={() => abort()}>cancel</button>
    </div>
  );
}

export default App;
