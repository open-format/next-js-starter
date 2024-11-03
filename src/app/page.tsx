"use client";

import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";

export default function Home() {
  const { login, logout, ready, user } = usePrivy();

  if (!ready) return <div>Loading...</div>;

  return (
    <div>
      {user?.wallet?.address ? (
        <>
          <div>wallet: {user?.wallet?.address}</div>
          <Button onClick={logout}>Logout</Button>
        </>
      ) : (
        <Button onClick={login}>Login</Button>
      )}
    </div>
  );
}
