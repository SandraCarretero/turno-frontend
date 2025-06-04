import { useAuth } from './context/AuthContext';
import { AppRouter } from './router/AppRouter';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <AppRouter />
  );
}

export default App;
