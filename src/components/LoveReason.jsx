import React from 'react';

const LoveReason = ({ reason, isVisible }) => {
  if (!reason || !isVisible) return null;

  return (
    <div className="love-reason">
      <h3>{reason.title}</h3>
      <p>{reason.reason}</p>
    </div>
  );
};

export default LoveReason;
