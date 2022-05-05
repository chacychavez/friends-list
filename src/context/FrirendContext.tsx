import React, { useCallback, useContext, useMemo, useState } from 'react';
import { IFriend, IFriends, FriendContextType } from '../types/Friend.types';

const FriendContext = React.createContext<FriendContextType | null>(null);

interface FriendProviderProps {
  children: React.ReactNode;
  value: object;
}

export const FriendProvider: React.FC<FriendProviderProps> = ({
  children,
  value = {},
}) => {
  const [friends, setFriends] = useState<IFriends>({});

  const addFriend = useCallback((friend: IFriend) => {
    setFriends((friends) => {
      const newFriends = { ...friends };
      newFriends[friend.walletAddress] = friend;
    });
  }, []);

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
    });
  }, []);

  const removeFriend = useCallback((walletAddress: string) => {
    setFriends((friends) => {
      const newFriends = { ...friends };
      delete newFriends[walletAddress];
    });
  }, []);

  const contextValue = useMemo(() => {
    return {
      friends,
      addFriend,
      updateFriend,
      removeFriend,
      ...value,
    };
  }, [friends, addFriend, updateFriend, removeFriend, value]);

  return (
    <FriendContext.Provider value={contextValue}>
      {children}
    </FriendContext.Provider>
  );
};

export const useBackup = () => {
  return useContext(FriendContext);
};
