import { Stack } from "@mui/material";
import { Outlet } from "react-router";
import Header from "./MainNavChildern/Header";

export default function MainNav() {

  return (
    <Stack direction="column" sx={{ minHeight: '100vh' }}>
      <Header />
      <Outlet />
    </Stack>
  )
}
