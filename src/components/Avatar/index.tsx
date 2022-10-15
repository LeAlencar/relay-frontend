/* eslint-disable @typescript-eslint/no-var-requires */
import { Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material'
import { MouseEvent, useContext, useState } from 'react'
import { useLazyLoadQuery } from 'react-relay'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { AvatarQuery } from './__generated__/AvatarQuery.graphql'

const graphql = require('babel-plugin-relay/macro')

export const AvatarModal = () => {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const response = useLazyLoadQuery<AvatarQuery>(
    graphql`
      query AvatarQuery {
        user {
          username
        }
      }
    `,
    {},
    { fetchPolicy: 'network-only' }
  )

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setIsOpen(true)
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Box display="flex" paddingLeft="10px" data-testid="user-icon">
      <IconButton
        data-testid="user-icon"
        aria-label="Current User"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar data-testid="user-icon" alt="user-icon">
          {response.user?.username.split(' ')[0][0]}
        </Avatar>
      </IconButton>
      <Menu
        data-testid="user-icon"
        id="user-menu"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        keepMounted
        open={isOpen}
        onClose={closeMenu}
        anchorEl={anchorEl}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  )
}
