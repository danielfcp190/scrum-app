import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Board from './components/Board';
import Team from './components/Team';
import Sprint from './components/Sprint';
import Burndown from './components/Burndown';

function App() {
  return (
    <Router>
      <div className="App">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <Link class="nav-link" to="/team">Team</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/board">Scrum Board</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/sprint">Sprint</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/burndown">Burndown</Link>
          </li>
        </ul>

        <Routes>
          <Route path="/team" element={<Team />} />
          <Route path="/board" element={<Board />} />
          <Route path="/sprint" element={<Sprint />} />
          <Route path="/burndown" element={<Burndown />} />
        </Routes>



      </div>
    </Router>
  );
}

export default App;
