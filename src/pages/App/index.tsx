import React from 'react';
import './App.css';
import { AddForm } from './../../common/AddForm';
import { Container } from '@mui/material';

export function App() {
  return (
    <div className="App">
      <Container>
        <AddForm />
      </Container>
    </div>
  );
}

export default App;
