import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://github.com/marice-romero/">
        Marice Romero
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Footer;
