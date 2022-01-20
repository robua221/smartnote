import React from "react";

const Alert = ( {message}) => {
  return (
    <div>
      <div className="alert alert-info text-center" role="alert">
     {message}
      </div>
    </div>
  );
};

export default Alert;
