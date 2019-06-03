import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { app } from './utils/electron'

const QuitDiv = styled.div`
  -webkit-app-region: no-drag;
  position: absolute;
  top: 0;
  right: 0;

  color: white;
  cursor: pointer;
  padding: 4px 12px;
  transition: color 50ms ease, background-color 50ms ease;

  &:hover {
    color: white;
    background-color: red;
  }
`

export const QuitButton: FunctionComponent = () => (
  <QuitDiv onClick={() => app.quit()}>
    <svg width='12' height='12' viewBox='0 0 12 12'>
      <polygon
        fill='currentColor'
        fillRule='evenodd'
        points='11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1'
      />
    </svg>
  </QuitDiv>
)
