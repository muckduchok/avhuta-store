import React from 'react';

function MessageBox(props) {
  return (
    <div className={`alert alert-${props.variant || 'info'}`}>
      <div className="messagebox">{props.children}</div>
    </div>
  );
}

export default MessageBox;
