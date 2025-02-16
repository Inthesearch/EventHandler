import { Outlet } from "react-router";
import MainNavigation from "./MainNavigation";

export default function Root() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
