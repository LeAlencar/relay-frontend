
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export default function Heading({ onOpenNewTransactionModal }: HeaderProps) {
  
  return (
    <>
      <>
      <Box sx={{ flexGrow: 1 }}>
        <CssBaseline />
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography align="center" variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Transactions
            </Typography>
            <Button color="success" variant="contained" onClick={onOpenNewTransactionModal}>
              New
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
    </>
  );
};