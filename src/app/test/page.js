"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const Test = () => {
  const router = useRouter();

  const updateURL = () => {
    // Change the URL to /test/abc without reloading the page
    window.history.replaceState(null, '', '/test/abc');  
  };

  return (
    <div>
      <button onClick={updateURL}>Click Me</button>
    </div>
  );
};

export default Test;
