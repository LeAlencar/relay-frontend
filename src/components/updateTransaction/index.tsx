/* eslint-disable @typescript-eslint/no-var-requires */
import Modal from 'react-modal'
import { Container } from './styles'

import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'

import { useMutation } from 'react-relay'
import { Typography } from '@mui/material'
import { useFormik } from 'formik'
import { updateTransactionMutation } from '../../mutations/updateMutation'
import { Transaction_transaction$data } from '../Transaction/__generated__/Transaction_transaction.graphql'
import { toast } from 'react-toastify'

interface UpdateTransactionModalProps {
  isOpen: boolean
  onRequestClose: () => void
  node: Transaction_transaction$data
}

export function UpdateTransactionModal({
  isOpen,
  onRequestClose,
  node
}: UpdateTransactionModalProps) {
  const [transactionUpdate] = useMutation(updateTransactionMutation)

  const formikValue = useFormik({
    initialValues: {
      id: node.id,
      name: node.name,
      category: node.category,
      price: node.price
    },
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      transactionUpdate({
        variables: {
          input: {
            transactionId: values.id,
            name: values.name,
            category: values.category,
            price: String(values.price)
          }
        },
        onCompleted(data) {
          console.log(data)
          toast.success('Transaction Updated!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
        }
      })
      actions.setSubmitting(false)
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
          value={formikValue.values.name as string}
        />
        <input
          id="price"
          type="number"
          placeholder="Valor"
          onChange={formikValue.handleChange}
          value={formikValue.values.price as string}
        />

        <input
          id="category"
          placeholder="Categoria"
          onChange={formikValue.handleChange}
          value={formikValue.values.category as string}
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
