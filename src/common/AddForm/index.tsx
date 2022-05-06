import {
  Box,
  Button,
  DialogActions,
  TextField,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { useState } from 'react';
import { useFriend } from '../../context/FrirendContext';
import { FriendContextType } from '../../types/Friend.types';
import React from 'react';

interface AddFormProps {
  handleClose: () => void;
}

export const AddForm: React.FC<AddFormProps> = ({ handleClose }) => {
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
    <>
      <DialogTitle>Add Friend</DialogTitle>
      <DialogContent>
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
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              addFriend({ walletAddress, name, email });
              handleClose();
            }}
            disabled={
              !!emailError ||
              !!walletAddressError ||
              !name ||
              !email ||
              !walletAddress
            }
          >
            Save
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  );
};
