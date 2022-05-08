import React from "react";
import '../../components/loading/loading.css';

export const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="spinner-border loading-forms" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow loading-forms" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="text-loading">
          <h3>Please wait...</h3>
      </div>
      
    </div>
  );
};
