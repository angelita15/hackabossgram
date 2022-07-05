import { createContext, useContext, useState } from 'react';

// Envolvemos el token en toda la aplicación guardandolo en el localStorage.

const TokenContext = createContext(null);

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const setTokenInLocalStorage = (newToken) => {
    if (!newToken) {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', newToken);
    }

    setToken(newToken);
  };

  return (
    <TokenContext.Provider value={[token, setTokenInLocalStorage]}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  return useContext(TokenContext);
};
