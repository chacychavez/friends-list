import { Box, Button, Container, TextField } from '@mui/material';
import { useState } from 'react';
import { useFriend } from '../../context/FrirendContext';
import { FriendContextType } from '../../types/Friend.types';

export const AddForm = () => {
  const { addFriend } = useFriend() as FriendContextType;
  const [name, setName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [email, setEmail] = useState('');
  const [walletAddressError, setWalletAddressError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleWalletAddressChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const error = /^0x[a-fA-F0-9]{40}$/.test(event.currentTarget.value)
      ? ''
      : 'Invalid Address';
    setWalletAddressError(error);
    setWalletAddress(event.currentTarget.value);
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const error =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        event.currentTarget.value
      )
        ? ''
        : 'Invaid Email';
    setEmailError(error);
    setEmail(event.currentTarget.value);
  };

  return (
    <Container>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50ch' },
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          error={!!walletAddressError}
          id="wallet-address"
          label="Wallet Address"
          variant="outlined"
          value={walletAddress}
          onChange={(event) => {
            handleWalletAddressChange(event);
          }}
          helperText={walletAddressError}
        />
        <TextField
          error={!!emailError}
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          helperText={emailError}
        />
        <Button
          variant="contained"
          onClick={() => {
            addFriend({ walletAddress, name, email });
          }}
          disabled={
            !!emailError ||
            !!walletAddressError ||
            !name ||
            !email ||
            !walletAddress
          }
        >
          Add Friend
        </Button>
      </Box>
    </Container>
  );
};
