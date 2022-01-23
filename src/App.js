import './App.css';
import {BrowserRouter as Router,
  Routes,
  Route} from 'react-router-dom';
import VideoPage from './Pages/VideoPage';
import Categories from './Components/Category/Categories';
import CreateRoomPage from './Pages/CreateRoomPage';
import FindRoomPage from './Pages/FindRoomPage';

function App() {
  return (
    <div className="App">
      <Router>
          <Categories />
          <Routes>
            <Route path="/create" element={<CreateRoomPage />} />
            <Route path="/rooms" element={<FindRoomPage />} />
            <Route path="/rooms/:roomId" element={<VideoPage />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
