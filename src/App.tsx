import Background from 'components/Background'
import { CompleteItem, FineItem } from 'components/Item'
import Header from 'components/Header'
import { Menu } from 'components/Menu'
import './styles.module.scss'

function App() {
  return (
    <>
      <Header />
      <main>
        <Menu />
        <Background>
          <CompleteItem
            title={
              <span>CLAUDIO</span>
            }
          >
            <FineItem />
          </CompleteItem>
        </Background>
      </main>
    </>
  )
}

export default App
