/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
import Modal from 'react-modal'
import { Container } from './styles'
import { toast } from 'react-toastify'
import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'

import { ConnectionHandler, useMutation } from 'react-relay'
import { Typography } from '@mui/material'
import { useFormik } from 'formik'
import { TransactionCreate } from '../../mutations/createMutation'
import { Dispatch, SetStateAction } from 'react'
import { ROOT_ID } from 'relay-runtime'

interface NewTransactionModalProps {
  handleModal: {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    onRequestClose: () => void
  }
}

export function NewTransactionModal({ handleModal }: NewTransactionModalProps) {
  const [transactionCreate, isMutationOnFlight] = useMutation(TransactionCreate)

  const connectionIDs = ConnectionHandler.getConnectionID(
    ROOT_ID,
    'TransactionList_transactions'
  )

  const formikValue = useFormik({
    initialValues: {
      name: '',
      category: '',
      price: ''
    },
    onSubmit: (values, actions) => {
      transactionCreate({
        variables: {
          input: {
            transactionId: Date.now(),
            name: values.name,
            category: values.category,
            price: String(values.price)
          },
          connections: [connectionIDs]
        },
        onCompleted(data) {
          console.log(data)
          handleModal.setIsOpen(false)
          toast.success('Transaction Created!', {
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
      isOpen={handleModal.isOpen}
      onRequestClose={handleModal.onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      ariaHideApp={false}
    >
      <button
        type="button"
        onClick={handleModal.onRequestClose}
        className="react-modal-close"
      >
        <CloseIcon />
      </button>
      <Container onSubmit={formikValue.handleSubmit}>
        <Typography variant="h2">Cadastrar Transação</Typography>
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
            'Cadastrar'
          )}
        </button>
      </Container>
    </Modal>
  )
}
