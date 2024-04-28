import React, { useEffect, useRef } from 'react';
import '../css/loading.css';

function Loading() {
  const dotsRef = useRef(null);


  useEffect(() => {
    // Function to animate the dots
    function animate(element, className) {
      element.classList.add(className);
      setTimeout(() => {
        element.classList.remove(className);
        setTimeout(() => {
          animate(element, className);
        }, 500);
      }, 2500);
    }
    
    // Execution
    const dots = dotsRef.current;
    if (dots) {
      animate(dots, "dots--animate");
    }
  }, []);

  return (
    <div className="loading">
    <h1>
      Loading{" "}
      <div className="dots" ref={dotsRef}>
        <span className="dot z" />
        <span className="dot f" />
        <span className="dot s" />
        <span className="dot t">
          <span className="dot l" />
        </span>
      </div>
    </h1>
    </div>
  );
}

export default Loading;
