import React from 'react';
import './App.css';
import { AddForm } from './../../common/AddForm';
import { Container } from '@mui/material';
import { FriendList } from '../../common/FriendList';
import { FriendProvider } from '../../context/FrirendContext';

export function App() {
  return (
    <div className="App">
      <FriendProvider>
        <Container>
          <AddForm />
          <FriendList />
        </Container>
      </FriendProvider>
    </div>
  );
}

export default App;
