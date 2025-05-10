import React from 'react';
import  { toast } from 'react-hot-toast';

const SendAlert = ({ users, onSend }) => {
  const [message, setMessage] = React.useState('');

  const handleSend = () => {
    if (!message.trim()) {
      toast.error('Notification message is required');
      return;
    }
    onSend(message);
    setMessage('');
    toast.success('Notification sent!');
  };

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        Send Notification to Team
      </h3>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter notification message"
        className="w-full p-2 text-sm border rounded mb-2"
        rows={3}
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-3 py-1.5 text-sm rounded hover:bg-blue-600"
      >
        Send Alert
      </button>
    </div>
  );
};

export default SendAlert;