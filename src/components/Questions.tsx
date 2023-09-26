import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { Question } from '../types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useQuestionStore } from '../store/questions'

const getBackgroundColor = (info: Question, index: number) => () => {
  const { correctAnswer, userSelectedAnswer } = info

  // no se aha seleccionado nada todavia
  if (userSelectedAnswer == null) return 'transparent'

  // se selecciono pero no coincide
  if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'

  // seleccion correcta
  if (index === correctAnswer) return 'green'

  // seleccion incorrecta
  if (index === userSelectedAnswer) return 'red'

  return 'transparent'
}

export const Questions = ({ info }: { info: Question }) => {
  const selectAnswer = useQuestionStore((state) => state.selectAnswer)

  const createHandleClick = (index: number) => () => selectAnswer(info.id, index)

  return (
    <Card
      variant="outlined"
      sx={{
        textAlign: 'left',
        padding: 2,
        backgroundColor: '#222',
        marginTop: 4,
      }}
    >
      <Typography variant="h5" component="h1">
        {info.question}
      </Typography>
      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>
      <List
        sx={{
          backgroundColor: '#333',
        }}
        disablePadding
      >
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              onClick={createHandleClick(index)}
              sx={{ backgroundColor: getBackgroundColor(info, index) }}
              disabled={info.userSelectedAnswer != null}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}
