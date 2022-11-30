import './App.css'
import { Button } from 'react-bootstrap'
import useMetaMask from './hooks/metamask';

function App() {
  
  const {connect, disconnect, isActive, account, shouldDisable} = useMetaMask()

  return (
    <div className="App">
      <header className="App-header">
        <Button variant="secondary" onClick={connect} disabled={shouldDisable} className="button">
          Connect to metamask
          <img src="images/metamask.svg" alt="MetaMask" width="50" height="50"></img>
        </Button>    
        <div className="mt-2 mb-2">
          Connected Account: { isActive ? account : '' } {/* kaam nhi kr rhaa syd */}
        </div>
        <Button variant="danger" onClick={disconnect} className="button">
          Disconnect MetaMask
          <img src="images/noun_waving.svg" width="50" height="50" ></img>
        </Button>
      </header>
    </div>
  );
}

export default App;