import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  transform: translateY(-10px);
  -webkit-app-region: no-drag;

  &:not(:last-child) {
    margin-right: 14px;
  }
`

const Button = styled.button`
  border-radius: 8px;
  padding: 6px 10px;

  outline: none;
  border: none;

  cursor: pointer;
  color: white;
  background: radial-gradient(circle, #ec6829 0%, #ec292a 70%, #c31f20 80%);

  box-shadow: 0 1px #440505, 0 2px #440505, 0 3px #440505, 0 4px #440505,
    0 5px #440505, 0 6px #440505, 0 7px #440505, 0 8px #440505, 0 9px #440505,
    0 10px #440505, 0 11px #440505, 0 12px #440505;

  &:hover {
    transform: translateY(-2px);

    background: radial-gradient(circle, #ec6829 10%, #ec292a 60%, #c31f20 70%);
    box-shadow: 0 1px #440505, 0 2px #440505, 0 3px #440505, 0 4px #440505,
      0 5px #440505, 0 6px #440505, 0 7px #440505, 0 8px #440505, 0 9px #440505,
      0 10px #440505, 0 11px #440505, 0 12px #440505, 0 13px #440505,
      0 14px #440505;
  }

  &:active {
    transform: translateY(8px);
    box-shadow: 0 1px #440505, 0 2px #440505, 0 3px #440505, 0 4px #440505;
  }
`

const Label = styled.span`
  font-size: 2.5em;
  line-height: 1em;
  font-weight: 900;
  font-style: italic;
  font-family: Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  text-transform: uppercase;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3), 2px 2px 0 rgba(0, 0, 0, 0.3),
    2px 2px 2px rgba(0, 0, 0, 0.4);
`

interface IProps {
  onClick?: () => any
}

export const ModeSwitch: FunctionComponent<IProps> = ({
  children,
  onClick,
}) => (
  <Container>
    <Button
      onClick={() => {
        if (typeof onClick === 'function') {
          onClick()
        }
      }}
    >
      <Label>{children}</Label>
    </Button>
  </Container>
)
