import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Login from './Components/Login';
import Register from './Components/Register';
import Characters from './Components/Characters';
import CharacterDetail from './Components/CharacterDetail';

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName: string) => {
    setCurrentForm(formName);
  };
  

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/:id" element={<CharacterDetail />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
