import FormBackground from 'components/FormBackground';
import Header from 'components/Header';
import Menu from 'components/Menu';
import './styles.scss';

function App() {
  return (
    <>
      <Header />
      <main>
        <Menu />
        <FormBackground />
      </main>
    </>
  );
}

export default App;
