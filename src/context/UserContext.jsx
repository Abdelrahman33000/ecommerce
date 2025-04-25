import { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (userData) => {
    sessionStorage.setItem('currentUser', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    sessionStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
