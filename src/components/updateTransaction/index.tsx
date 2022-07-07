/* eslint-disable @typescript-eslint/no-var-requires */
import Modal from 'react-modal'
import { Container } from './styles'

import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'

import { useMutation } from 'react-relay'
import { Typography } from '@mui/material'
import { useFormik } from 'formik'
import { updateTransactionMutation } from './updateMutation'

interface UpdateTransactionModalProps {
  isOpen: boolean
  onRequestClose: () => void
  node: {
    id: string
    name: string
    category: string
    price: string
  }
}

export function UpdateTransactionModal({
  isOpen,
  onRequestClose,
  node
}: UpdateTransactionModalProps) {
  const [transactionUpdate] = useMutation(updateTransactionMutation)
  console.log(node.id)

  const formikValue = useFormik({
    initialValues: {
      id: node.id,
      name: node.name,
      category: node.category,
      price: node.price
    },
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      setTimeout(() => {
        transactionUpdate({
          variables: {
            input: {
              transactionId: node.id,
              name: values.name,
              category: values.category,
              price: String(values.price)
            }
          },
          onCompleted(data) {
            console.log(data)
            window.alert('Transaction updated o/')
          }
        })
        actions.setSubmitting(false)
      }, 2000)
    }
  })

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      ariaHideApp={false}
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <CloseIcon />
      </button>
      <Container onSubmit={formikValue.handleSubmit}>
        <Typography variant="h2">Atualizar Transação</Typography>
        <input name="id" type="hidden" value={node.id} />
        <input
          id="name"
          placeholder="Nome"
          onChange={formikValue.handleChange}
          value={formikValue.values.name}
        />
        <input
          id="price"
          type="number"
          placeholder="Valor"
          onChange={formikValue.handleChange}
          value={formikValue.values.price}
        />

        <input
          id="category"
          placeholder="Categoria"
          onChange={formikValue.handleChange}
          value={formikValue.values.category}
        />
        <button type="submit">
          {formikValue.isSubmitting ? (
            <CircularProgress color="inherit" />
          ) : (
            'Atualizar'
          )}
        </button>
      </Container>
    </Modal>
  )
}
