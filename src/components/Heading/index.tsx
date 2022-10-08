import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { NewTransactionModal } from '../newTransactionModal'
import { AuthContext } from '../../context/AuthContext'

export default function Heading() {
  const { isAuth } = useContext(AuthContext)
  const [isModalOpen, setIsOpen] = useState(false)

  function handleOpenNewTransactionModal() {
    setIsOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setIsOpen(false)
  }

  const handleModal = {
    isOpen: isModalOpen,
    setIsOpen: setIsOpen,
    onRequestClose: handleCloseNewTransactionModal
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <CssBaseline />
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography
              align="center"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Transactions
            </Typography>
            {isAuth && (
              <Button
                color="success"
                variant="contained"
                onClick={handleOpenNewTransactionModal}
              >
                New
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {isAuth && <NewTransactionModal handleModal={handleModal} />}
    </>
  )
}
