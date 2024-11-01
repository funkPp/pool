import Userfront from "@userfront/react";
import {LogoutButton, useUserfront} from "@userfront/react";

export default function Dashboard() {
  const { isAuthenticated, isLoading, user } = useUserfront();
  let render = (<></>)
  if (isAuthenticated) {
    render = <div>Authenticated</div>
  } else {
    render = <div>not</div>
  }

  return (
    <div>
      <h2>Dashboard {isAuthenticated}</h2>
      {render}  
      <pre>{user.email}</pre>
      <LogoutButton />
    </div>
  );
}