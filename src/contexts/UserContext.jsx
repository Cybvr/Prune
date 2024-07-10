import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    completedTasks: 0,
    visitedCountries: 0,
    wonChallenges: 0,
    currentLocation: '',
  });

  useEffect(() => {
    // Simulating an API call to fetch user data
    const fetchUserData = async () => {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({
        name: 'John Doe',
        email: 'john@example.com',
        completedTasks: 45,
        visitedCountries: 3,
        wonChallenges: 8,
        currentLocation: 'Bali, Indonesia',
      });
    };

    fetchUserData();
  }, []);

  const updateUser = (newData) => {
    setUser(prevUser => ({ ...prevUser, ...newData }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};