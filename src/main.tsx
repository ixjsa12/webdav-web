import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LinkProps } from "@mui/material/Link";
import {
  HashRouter,
  Routes,
  Route,
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
function video() {
  return (
    <>
      <h1>xxx</h1>
    </>
  );
}
const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return (
    <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />
  );
});

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <HashRouter basename="/">
      <Routes>
        <Route path="/video/:path*" Component={video} />
        <Route path="/pdf/:path*" Component={video} />
        <Route path="/png/:path*" Component={video} />
        <Route path="/" Component={App} />
        <Route path="/:path*" Component={App} /> {/* 👈 Renders at /#/app/ */}
      </Routes>
    </HashRouter>
  </ThemeProvider>,
);
