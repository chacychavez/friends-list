import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Typography,
  TextField,
} from '@mui/material';
import { IFriend } from '../../../types/Friend.types';
import { useFriend } from '../../../context/FriendContext';
import { FriendContextType } from '../../../types/Friend.types';
import { ContentCopy, MoreVert } from '@mui/icons-material';

interface FriendCardProps {
  friend: IFriend;
}
export const FriendCard: React.FC<FriendCardProps> = ({ friend }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const buttonRef = React.useRef(null);
  const [openCopied, setOpenCopied] = useState(false);

  const { updateFriend, removeFriend } = useFriend() as FriendContextType;
  const [name, setName] = useState(friend.name);
  const [email, setEmail] = useState(friend.email);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [emailError, setEmailError] = useState('');

  const [openRemove, setOpenRemove] = useState(false);

  const handleClick = () => {
    setAnchorEl(buttonRef.current);
  };
  const handleClose = () => {
    setAnchorEl(null);
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

  const handleCloseRemove = () => {
    setOpenRemove(false);
  };

  const handleSave = () => {
    setShowUpdate(false);
    updateFriend({
      walletAddress: friend.walletAddress,
      name,
      email,
    });
  };

  const randomColor = () => {
    let hex = Math.floor(Math.random() * 0xffffff);
    let color = '#' + hex.toString(16);

    return color;
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: randomColor }} aria-label="recipe">
              {friend.name[0].toUpperCase()}
            </Avatar>
          }
          style={{ textAlign: 'left' }}
          action={
            <IconButton
              ref={buttonRef}
              aria-label="settings"
              id="demo-positioned-button-"
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVert />
            </IconButton>
          }
          title={friend.name}
          subheader={friend.email}
        />
        <Menu
          anchorEl={anchorEl}
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              setShowUpdate(true);
            }}
          >
            Update
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              setOpenRemove(true);
            }}
          >
            Remove
          </MenuItem>
        </Menu>
        <Dialog
          open={openRemove}
          onClose={handleCloseRemove}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Do you want to remove this friend?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You cannot undo this action
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRemove}>Cancel</Button>
            <Button
              onClick={() => {
                removeFriend(friend.walletAddress);
              }}
              autoFocus
            >
              Remove
            </Button>
          </DialogActions>
        </Dialog>
        {!showUpdate ? (
          <CardContent>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Wallet Address
            </Typography>
            <Typography
              variant="h5"
              component="div"
              style={{ wordWrap: 'break-word' }}
            >
              <code>{friend.walletAddress}</code>{' '}
              <ContentCopy
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigator.clipboard
                    .writeText(friend.walletAddress)
                    .then(function () {
                      setOpenCopied(true);
                    });
                }}
              />
              <Snackbar
                open={openCopied}
                autoHideDuration={3000}
                onClose={() => {
                  setOpenCopied(false);
                }}
                message="Copied to clipboard"
              />
            </Typography>
          </CardContent>
        ) : (
          <>
            <CardContent>
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
                  disabled
                  id="wallet-address"
                  label="Wallet Address"
                  variant="outlined"
                  value={friend.walletAddress}
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
            </CardContent>
            <CardActions>
              <Button size="small" onClick={handleSave}>
                Save
              </Button>
            </CardActions>
          </>
        )}
      </>
    </Card>
  );
};
