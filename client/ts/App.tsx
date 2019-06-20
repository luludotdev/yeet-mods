import React, { FunctionComponent, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Button } from './Button'
import { ModeSwitch } from './ModeSwitch'
import { QuitButton } from './Quit'
import { playClunk } from './sound'
import { callMain } from './utils/betterIPC'

const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  -webkit-app-region: drag;
  -webkit-user-select: none;
`

const Buttons = styled.div`
  margin-top: 48px;
  display: flex;
`

type YeetType = 'classic' | 'mega' | 'giga'

export const App: FunctionComponent = () => {
  const [type, setType] = useState('classic' as YeetType)

  const handleYeet = async () => {
    try {
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
        label={
          type === 'giga'
            ? 'GIGA YEET'
            : type === 'mega'
            ? 'MEGA YEET'
            : 'YEET MODS'
        }
        onClick={() => handleYeet()}
        onMouseDown={() => playClunk()}
      />

      <Buttons>
        <ModeSwitch onClick={() => setType('classic')}>Yeet</ModeSwitch>
        <ModeSwitch onClick={() => setType('mega')}>Mega</ModeSwitch>
        <ModeSwitch onClick={() => setType('giga')}>Giga</ModeSwitch>
      </Buttons>
    </Container>
  )
}
