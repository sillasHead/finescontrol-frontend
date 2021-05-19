import Background from 'components/Background';
import { CompleteItem } from 'components/Item';
import Header from 'components/Header';
import { Menu, ItemMenu } from 'components/Menu';
import CompleteFine from 'components/ModalsForms/Fine';
import './styles.module.scss';

function App() {
  return (
    <>
      <Header />
      <main>
        <Menu>
          <ItemMenu selected={true} />
          <ItemMenu selected={false} />
          <ItemMenu selected={false} />
          <ItemMenu selected={false} />
        </Menu>
        <Background>
          <CompleteItem>
            <CompleteFine />
          </CompleteItem>
        </Background>
      </main>
    </>
  );
}

export default App;
