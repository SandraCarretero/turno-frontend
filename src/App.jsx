import { useAuth } from './context/AuthContext';
import { AppRouter } from './router/AppRouter';
// import { ErrorBoundary } from 'react-error-boundary';

// function ErrorFallback({ error }) {
//   return (
//     <div role="alert">
//       <p>Something went wrong:</p>
//       <pre>{error.message}</pre>
//     </div>
//   );
// }

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    // <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppRouter />
    // </ErrorBoundary>
  );
}

export default App;
