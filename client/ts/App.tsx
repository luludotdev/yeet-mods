import Mousetrap from 'mousetrap'
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

type YeetType = 'classic' | 'mega' | 'giga'

export const App: FunctionComponent = () => {
  const [megaYeet, setMegaYeet] = useState(false)
  const [gigaYeet, setGigaYeet] = useState(false)

  Mousetrap.bind('y e e t', () => setGigaYeet(!gigaYeet))

  const handleYeet = async () => {
    try {
      const type: YeetType = gigaYeet ? 'giga' : megaYeet ? 'mega' : 'classic'
      await callMain<void, YeetType>('yeet-mods', type)
    } catch (err) {
      // lmao
    }
  }

  return (
    <Container>
      <GlobalStyles />

      <QuitButton />
      <Button
        label={gigaYeet ? 'GIGA YEET' : megaYeet ? 'MEGA YEET' : 'YEET MODS'}
        onClick={() => handleYeet()}
      />

      <Konami action={() => setMegaYeet(!megaYeet)} timeout={10} />
    </Container>
  )
}
