import React from 'react';
import './Button.css';

// PureComponent
function Button(props){
  const { children, ...restProps } = props;
    return (
      <button className="btn" {...restProps}>
        {children}
      </button>
    );
}

export default Button;
