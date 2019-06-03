import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Button } from './Button'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  -webkit-app-region: drag;
  -webkit-user-select: none;
`

export const App: FunctionComponent = () => <Container />

