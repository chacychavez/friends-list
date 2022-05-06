import React, { useCallback, useContext, useMemo, useState } from 'react';
import { IFriend, IFriends, FriendContextType } from '../types/Friend.types';

const FriendContext = React.createContext<FriendContextType | null>(null);

interface FriendProviderProps {
  children: React.ReactNode;
}

export const FriendProvider: React.FC<FriendProviderProps> = ({ children }) => {
  const [friends, setFriends] = useState<IFriends>({
    '0xcD4AD67BdC3A2F52C7c65241DcDE8dF1519253f8': {
      walletAddress: '0xcD4AD67BdC3A2F52C7c65241DcDE8dF1519253f8',
      name: 'Juan Dela Cruz',
      email: 'jdc@gmail.com',
    },
  });

  const addFriend = useCallback(
    (friend: IFriend) => {
      if (friend.walletAddress in friends) {
        return false;
      }
      setFriends((friends) => {
        const newFriends = { ...friends };
        newFriends[friend.walletAddress] = friend;
        return newFriends;
      });
      return true;
    },
    [friends]
  );

  const updateFriend = useCallback((partialFriend: Partial<IFriend>) => {
    setFriends((friends) => {
      const newFriends = { ...friends };
      const friendWalletAddress = partialFriend?.walletAddress;
      if (friendWalletAddress && friendWalletAddress in newFriends) {
        newFriends[friendWalletAddress] = {
          ...newFriends[friendWalletAddress],
          ...partialFriend,
        };
      }
      return newFriends;
    });
  }, []);

  const removeFriend = useCallback((walletAddress: string) => {
    setFriends((friends) => {
      const newFriends = { ...friends };
      delete newFriends[walletAddress];
      return newFriends;
    });
  }, []);

  const contextValue = useMemo(() => {
    return {
      friends,
      addFriend,
      updateFriend,
      removeFriend,
    };
  }, [friends, addFriend, updateFriend, removeFriend]);

  return (
    <FriendContext.Provider value={contextValue}>
      {children}
    </FriendContext.Provider>
  );
};

export const useFriend = () => {
  return useContext(FriendContext);
};
