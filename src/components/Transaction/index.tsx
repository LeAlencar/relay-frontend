import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
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
    <Card sx={{ minWidth: 175, marginBottom: 5 }}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
          {node.name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          R$ {node.price}
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
          Category: {node.category}
        </Typography>
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
        <UpdateTransactionModal
          isOpen={isUpdateModalOpen}
          onRequestClose={handleCloseUpdateModal}
          node={node}
        />
      </CardContent>
    </Card>
  )
}
