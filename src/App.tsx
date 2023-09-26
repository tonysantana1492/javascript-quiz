import { Container, Typography, Stack } from '@mui/material'
import { JavaScriptLogo } from './components/JavascriptLogo'

import './App.css'
import { StartButton } from './components/StartButton'
import { useQuestionStore } from './store/questions'
import { Game } from './components/Game'

function App() {
  const questions = useQuestionStore((state) => state.questions)

  return (
    <main>
      <Container maxWidth="sm">
        <Stack direction="row" justifyContent="center" alignItems="center" gap={2}>
          <JavaScriptLogo />
          <Typography variant="h2" component="h1">
            JavaScript Quiz
          </Typography>
        </Stack>
        {questions.length === 0 && <StartButton />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  )
}

export default App
