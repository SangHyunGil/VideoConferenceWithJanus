import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,
  Routes,
  Route} from 'react-router-dom';
import VideoPage from './Pages/VideoPage';
import Categories from './Components/Categories';
import CreateRooms from './Components/CreateRooms';
import FindRooms from './Components/FindRooms';

function App() {
  return (
    <div className="App">
      <Router>
          <Categories />
          <Routes>
            <Route path="/create" element={<CreateRooms />} />
            <Route path="/rooms" element={<FindRooms />} />
            <Route path="/rooms/:roomId" element={<VideoPage />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
