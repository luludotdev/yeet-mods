import React, { FunctionComponent, useState } from 'react'
import Konami from 'react-konami-code'
import styled from 'styled-components'
import { Button } from './Button'
import { QuitButton } from './Quit'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  -webkit-app-region: drag;
  -webkit-user-select: none;
`

export const App: FunctionComponent = () => {
  const [megaYeet, setMegaYeet] = useState(false)

  return (
    <Container>
      <QuitButton />
      <Button label={megaYeet ? 'MEGA YEET' : 'YEET MODS'} />

      <Konami action={() => setMegaYeet(!megaYeet)} timeout={10} />
    </Container>
  )
}
