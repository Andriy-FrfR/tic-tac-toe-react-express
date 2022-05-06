import './App.css';
import Layout from './hoc/Layout';
import MenuPage from './pages/MenuPage/MenuPage';
import Game from './pages/Game/Game';
import Modals from './components/Modals/Modals';
import Loader from './components/Loader/Loader';
import { useTicTacToe } from './hooks/useTicTacToe';
import { useEffect } from 'react';

function App() {
  const ticTacToe = useTicTacToe();

  useEffect(() => {
    ticTacToe.connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Layout>
        {ticTacToe.isLoading ? (
          <Loader />
        ) : ticTacToe.isShowGame ? (
          <Game />
        ) : (
          <MenuPage />
        )}
      </Layout>
      <Modals />
    </div>
  );
}

export default App;
