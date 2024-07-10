import React from 'react';

const WelcomeCard = ({ name }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-3xl font-semibold text-gray-800">Hello, {name}</h1>
    </div>
  );
};

export default WelcomeCard;