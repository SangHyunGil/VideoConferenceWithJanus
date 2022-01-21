import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,
  Routes,
  Route} from 'react-router-dom';
import VideoPage from './Pages/VideoPage';
import Categories from './Components/Categories';
import CreateVideo from './Components/CreateVideo';

function App() {
  return (
    <div className="App">
      <Router>
          <Categories />
          <Routes>
            <Route path="/" element={<CreateVideo />} />
            <Route path="/rooms/:id" element={<VideoPage />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
