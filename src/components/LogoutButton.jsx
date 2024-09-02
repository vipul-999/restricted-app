"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = Boolean(localStorage.getItem("loggedIn"));
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("visitCount");
    router.push("/");
  };

  if (!isLoggedIn) {
    return null;
  }

  return <button onClick={handleLogout}>Logout</button>;
}
