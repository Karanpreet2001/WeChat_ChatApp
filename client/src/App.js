import logo from './logo.svg';
import './App.css';

import Login from"./components/Login";
import { Container } from 'react-bootstrap';
import Routess from './components/Routess';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
  
    <div className="App">
      
    <Router>
        
      <Container>
        <Routess></Routess>
      </Container>
    </Router>
    

  </div>
 
  );
}

export default App;
