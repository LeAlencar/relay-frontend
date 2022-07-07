import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useState } from 'react'
import { UpdateTransactionModal } from '../updateTransaction'
import { useMutation } from 'react-relay'
import { TransactionDelete } from '../../mutations/deleteMutation'

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
  const [transactionDelete] = useMutation(TransactionDelete)

  function handleOpenUpdateModal() {
    setIsUpdateModalOpen(true)
  }

  function handleCloseUpdateModal() {
    setIsUpdateModalOpen(false)
  }

  function handleDelete() {
    transactionDelete({
      variables: {
        input: {
          transactionId: node.id
        }
      },
      onCompleted(data) {
        console.log(data)
        window.alert('Transaction deleted o/')
      }
    })
  }

  return (
    <Card sx={{ minWidth: 275, marginBottom: 5 }}>
      <CardContent>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {node.name}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Price: R$ {node.price}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Category: {node.category}
        </Typography>

        <Box display="flex" justifyContent="space-between">
          <Button
            color="success"
            variant="contained"
            onClick={handleOpenUpdateModal}
          >
            Edit
          </Button>
          <Button color="warning" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </Box>

        <UpdateTransactionModal
          isOpen={isUpdateModalOpen}
          onRequestClose={handleCloseUpdateModal}
          node={node}
        />
      </CardContent>
    </Card>
  )
}
