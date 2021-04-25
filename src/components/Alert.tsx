import React from 'react';

type Props = {
  message: string;
  type: 'info' | 'error';
};

const Alert = ({ message, type }: Props): React.ReactElement => {
  if (type === 'info') {
    return (
      <div className="px-8 py-8 mx-4 text-blue-900 bg-blue-100 border border-blue-300 rounded-xl">
        {message}
      </div>
    );
  }
  return (
    <div className="px-8 py-8 mx-4 text-red-900 bg-red-100 border border-red-300 rounded-xl">
      {message}
    </div>
  );
};

export default Alert;
