import Modal from 'react-modal';
import { Container } from './styles';

import CloseIcon from '@mui/icons-material/Close';


import { useMutation } from 'react-relay';
import { Typography } from '@mui/material';
import { useFormik } from 'formik';

const graphql = require('babel-plugin-relay/macro');

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const TransactionCreate = graphql`
    mutation newTransactionModalMutation($input: TransactionCreateInput!) {
      TransactionCreate(input: $input) {
        success
        error
        transaction {
          id
          name
          category
          price
        }
      }
    }
  `;

  const [transactionCreate] = useMutation(TransactionCreate)

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
        },
        onCompleted(data) {
          console.log(data);
          window.alert("Transaction created o/");
        },
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
      <button type="button" onClick={onRequestClose} className="react-modal-close">
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
        <button type="submit">{formikValue.isSubmitting ? 'Cadastrando...' : 'Cadastrar'}</button>
      </Container>
    </Modal>
  )
}