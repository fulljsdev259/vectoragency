import React from "react";

export default function Loader({ message, isLoading }) {
  if (isLoading || message) {
    return (
      <div className="loader-wrapper">
        {isLoading && <div className="loader" />}
        {message && !isLoading && <span>{message}</span>}
      </div>
    );
  } else return null;
}
