import { useState } from 'react'
import { Container, ButtonGroup, Button, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { blueGrey } from '@mui/material/colors'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blueGrey[50]),
  backgroundColor: blueGrey[50],
  borderColor: blueGrey[200],
  '&:hover': {
    backgroundColor: blueGrey[100],
    borderColor: blueGrey[300]
  }
}))

const StyledInput = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: 0,
      borderColor: blueGrey[200]
    },
    '&:hover fieldset': {
      borderColor: blueGrey[300]
    },
    '&.Mui-focused fieldset': {
      borderColor: blueGrey[500]
    },
    '& input': {
      textAlign: 'center',
      width: 40,
      color: blueGrey[700]
    }
  }
})

export default function CounterTemp({counter, limit}) {
  const [count, setCount] = useState(() => limit)
  const handleChange = (event) => {
    setCount(Math.max(Number(event.target.value), 1))
  }

  return (
    <Container>
      <ButtonGroup>
        <StyledButton onClick={() => setCount((prev) => prev - counter)} disabled={count === limit} style={{padding: 10}}>
          <RemoveIcon fontSize='small' />
        </StyledButton>
        <StyledInput size='small' onChange={handleChange} value={count + ' %'} />
        <StyledButton onClick={() => setCount((prev) => prev + counter)} style={{padding: 10}}>
          <AddIcon fontSize='small' />
        </StyledButton>
      </ButtonGroup>
    </Container>
  )
}
