import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,
  Routes,
  Route} from 'react-router-dom';
import VideoPage from './Pages/VideoPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<VideoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
