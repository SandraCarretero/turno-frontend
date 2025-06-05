import { useEffect, useState } from 'react';
import Loader from './components/Loader/Loader';
import { useAuth } from './context/AuthContext';
import { AppRouter } from './router/AppRouter';

function App() {
  const { loading } = useAuth();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading || showLoader) {
    return <Loader />;
  }

  return <AppRouter />;
}

export default App;
