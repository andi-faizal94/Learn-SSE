import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/stream' element={<Dashboard />} exact />
      </Routes>
    </div>
  );
}

export default App;
