'use client'; // Mark this component as client-side

import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const router = useRouter();

  const handleLogin = () => {
    // Set localStorage items
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('visitCount', '0');

    // Set cookies (optional, for better persistence)
    document.cookie = 'loggedIn=true; path=/';
    document.cookie = 'visitCount=0; path=/';

    // Refresh the page to update the content based on login status
    router.refresh();
  };

  return (
    <button onClick={handleLogin}>
      Login
    </button>
  );
}
