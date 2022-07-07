import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { UpdateTransactionModal } from '../updateTransaction'

interface nodeProps {
  key: string
  node: {
    id: string
    name: string
    price: string
    category: string
  }
}

export function Transaction({ node }: nodeProps) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  function handleOpenUpdateModal() {
    setIsUpdateModalOpen(true)
  }

  function handleCloseUpdateModal() {
    setIsUpdateModalOpen(false)
  }

  return (
    <Card sx={{ minWidth: 275, marginBottom: 5 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {node.name}
        </Typography>
        <Button
          color="success"
          variant="contained"
          onClick={handleOpenUpdateModal}
        >
          Edit
        </Button>
        <UpdateTransactionModal
          isOpen={isUpdateModalOpen}
          onRequestClose={handleCloseUpdateModal}
          node={node}
        />
      </CardContent>
    </Card>
  )
}
