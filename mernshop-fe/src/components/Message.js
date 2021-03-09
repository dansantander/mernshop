import React from 'react';
import { Alert } from 'react-bootstrap';

// Children will be the text we want inside the message component
const Message = ({ variant, children }) => {
  return (
    <Alert variant={variant}>
      {children}
    </Alert>
  )
}

// We default it to blue
Message.defaultProps = {
  variant: 'info'
}

export default Message;
