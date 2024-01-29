import AppBar from "@mui/material/AppBar";
import FolderIcon from "@mui/icons-material/Folder";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [pass, setPass] = useState(false);
  const path_arr: string[] = pathname.replace(/^\/|\/$/g, "").split("/");
  const routes = path_arr.map((e) => {
    let result = "";
    const index = path_arr.findIndex((k) => k === e);
    for (let i = 0; i <= index; i++) {
      result += `/${path_arr[i]}`;
    }
    return (
      <Link underline="hover" color="inherit" href={result}>
        {decodeURI(e)}
      </Link>
    );
  });
  console.log("files", files);
  useEffect(() => {
    setPass(false);
    fetch(`https://z4tykw-8787.csb.app/webdav/query${pathname}`)
      .then((rs) => rs.json())
      .then((rs) => {
        if (rs.status == 200) {
          setFiles(rs.data);
        } else if (rs.status == 401) {
          setPass(true);
        }
      });
  }, [pathname]);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav" position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              MUI
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}></Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Container fixed maxWidth="sm">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              根路径
            </Link>
            {routes}
          </Breadcrumbs>
          {pass ? (
            <h1>需要密码哦</h1>
          ) : (
            <List>
              {files.map((e: any) => (
                <ListItem
                  onClick={() => {
                    if (e.size > 0) {
                      window.open("/webdav/down" + pathname + e.path);
                    } else {
                      navigate(pathname + e.path);
                    }
                  }}
                >
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={decodeURI(e.path).replace("/", "")}
                    // secondary="Secondary text"
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Container>
      </Box>
    </>
  );
}
export default App;
