import Userfront from "@userfront/react";
import {LogoutButton, useUserfront} from "@userfront/react";

export default function Home() {
  const { isAuthenticated, isLoading, user } = useUserfront();
//   const userData = JSON.stringify(Userfront.user, null, 2);
  return (
    <div>
      <h2>HOME</h2>
    </div>
  );
}