import { createContext, useCallback, useState } from "react";

type AuthContext = {
  userId: number | null;
  setUserId: (userId: number | null) => void;
};

// userIdの初期値はnull
export const authContext = createContext<AuthContext>({
  userId: null,
  setUserId: () => {},
});

// 子コンポーネントからも更新可能にさせる
export const useAuthContext = () => {
  const [userId, _setUserId] = useState<number | null>(null);

  const setUserId = useCallback((nextUserId: number | null) => {
    _setUserId(nextUserId);
  }, []);

  return { userId, setUserId };
};
