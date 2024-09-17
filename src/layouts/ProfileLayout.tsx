import Tabs from "@/components/profile/Tabs";
import { Outlet } from "react-router-dom";

//Vid 618
export default function ProfileLayout() {
  return (
    <>
        <Tabs />
        <Outlet />
    </>
  )
}
