// import logo from './logo.svg';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import AdminPage from './components/AdminPage';
import HomePage from './components/HomePage';
import UserPage from './components/UserPage';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route exact path='/Admin' element={<AdminPage/>}/>
        <Route exact path='/User' element={<UserPage/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
