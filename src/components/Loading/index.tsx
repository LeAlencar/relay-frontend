import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export const Loading = () => {
  return (
    <Box height="100%" display="flex" justifyContent="center" mt={50}>
      <CircularProgress />
    </Box>
  )
}
