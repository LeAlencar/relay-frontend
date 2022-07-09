import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { NewTransactionModal } from '../newTransactionModal'

export default function Heading() {
  const [isNewTransactionModalOpen, setIsNewModalTransactionOpen] =
    useState(false)

  function handleOpenNewTransactionModal() {
    setIsNewModalTransactionOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setIsNewModalTransactionOpen(false)
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
            <Button
              color="success"
              variant="contained"
              onClick={handleOpenNewTransactionModal}
            >
              New
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        setIsOpen={setIsNewModalTransactionOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </>
  )
}
