import CardContent  from "@mui/material/CardContent";
import Card  from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useLazyLoadQuery } from 'react-relay/hooks'
import { TransactionsQuery } from "./__generated__/TransactionsQuery.graphql";

const graphql = require('babel-plugin-relay/macro');

export default function Transactions() {
  const response = useLazyLoadQuery<TransactionsQuery>(graphql`
  query TransactionsQuery {
    transactions {
      edges {
        node {
          id
          name
          category
          price
        }
      }
    }
  },
`, {},
 {fetchPolicy: 'network-only'}
);

  const { transactions } = response
  console.log(transactions.edges)
  return (
    <Container sx={{ marginTop: 10}}>
      {transactions.edges.map(({node}: any) => {
        return (
          <Card sx={{ minWidth: 275 }} key={node.id} >
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {node.name}
            </Typography>
          </CardContent>
        </Card>
        )
      })}
    </Container>
  )
}