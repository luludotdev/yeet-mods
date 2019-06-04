import React, { FunctionComponent, useState } from 'react'
import Konami from 'react-konami-code'
import styled, { createGlobalStyle } from 'styled-components'
import { Button } from './Button'
import { QuitButton } from './Quit'
import { callMain } from './utils/betterIPC'

const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
`

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

  const handleYeet = async () => {
    try {
      await callMain<void, boolean>('yeet-mods', megaYeet)
    } catch (err) {
      // lmao
    }
  }

  return (
    <Container>
      <GlobalStyles />

      <QuitButton />
      <Button
        label={megaYeet ? 'MEGA YEET' : 'YEET MODS'}
        onClick={() => handleYeet()}
      />

      <Konami action={() => setMegaYeet(!megaYeet)} timeout={10} />
    </Container>
  )
}
