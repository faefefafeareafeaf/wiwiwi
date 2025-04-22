import { useEffect, useState } from 'react';

export default function ExampleComponent() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== 'undefined') {
      const handleResize = () => setWindowWidth(window.innerWidth);
      handleResize(); // Set initial width
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return <div>Window width: {windowWidth}</div>;
}
