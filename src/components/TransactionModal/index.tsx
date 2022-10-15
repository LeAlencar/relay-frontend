/* eslint-disable @typescript-eslint/no-var-requires */
import Modal from 'react-modal'
import { Container } from './styles'

import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'

import { ConnectionHandler, useMutation } from 'react-relay'
import { Typography } from '@mui/material'
import { useFormik } from 'formik'
import { updateTransactionMutation } from '../../mutations/updateMutation'
import { Transaction_transaction$data } from '../Transaction/__generated__/Transaction_transaction.graphql'
import { toast } from 'react-toastify'
import { Dispatch, SetStateAction } from 'react'
import { ROOT_ID } from 'relay-runtime'
import { TransactionCreate } from '../../mutations/createMutation'
interface TransactionModalProps {
  handleModal: {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    onRequestClose: () => void
  }
  node?: Transaction_transaction$data
  creationModal?: boolean
}

export function TransactionModal({
  handleModal,
  node,
  creationModal
}: TransactionModalProps) {
  const [transactionUpdate] = useMutation(updateTransactionMutation)
  const [transactionCreate] = useMutation(TransactionCreate)

  const connectionIDs = ConnectionHandler.getConnectionID(
    ROOT_ID,
    'TransactionList_transactions'
  )
  const formikValue = useFormik({
    initialValues: {
      id: node ? node.id : '',
      name: node ? node.name : '',
      category: node ? node.category : '',
      price: node ? node.price : ''
    },
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      if (creationModal) {
        transactionCreate({
          variables: {
            input: {
              name: values.name,
              category: values.category,
              price: String(values.price)
            },
            connections: [connectionIDs]
          },
          onCompleted() {
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
      } else {
        transactionUpdate({
          variables: {
            input: {
              transactionId: values.id,
              name: values.name,
              category: values.category,
              price: String(values.price)
            },
            connections: [connectionIDs]
          },
          onCompleted() {
            handleModal.setIsOpen(false)
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
      }
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
        <Typography variant="h2">
          {node ? 'Atualizar Transação' : 'Cadastrar Transação'}
        </Typography>
        {node && <input name="id" type="hidden" value={node.id} />}

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
          ) : node ? (
            'Atualizar'
          ) : (
            'Criar'
          )}
        </button>
      </Container>
    </Modal>
  )
}
