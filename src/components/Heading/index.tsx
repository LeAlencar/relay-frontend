import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { NewTransactionModal } from '../newTransactionModal'

interface HeadingProps {
  conns: string
}

export default function Heading({ conns }: HeadingProps) {
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
      <NewTransactionModal handleModal={handleModal} conns={conns} />
    </>
  )
}
