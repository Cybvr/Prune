import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

const MessageIcon = () => {
  const [unreadCount, setUnreadCount] = useState(3); // Example unread count

  return (
    <div className="relative">
      <button className="text-gray-600 hover:text-gray-800">
        <MessageSquare size={24} />
      </button>
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </div>
  );
};

export default MessageIcon;