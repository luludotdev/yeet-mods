import React, { FunctionComponent, MouseEvent } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  transform: translateY(-10px);
  -webkit-app-region: no-drag;
`

const ButtonComponent = styled.button`
  width: 500px;
  height: 500px;
  border-radius: 50%;

  outline: none;
  border: none;

  cursor: pointer;
  color: white;
  background: radial-gradient(circle, #ec6829 0%, #ec292a 60%, #c31f20 70%);

  box-shadow: 0 1px #440505, 0 2px #440505, 0 3px #440505, 0 4px #440505,
    0 5px #440505, 0 6px #440505, 0 7px #440505, 0 8px #440505, 0 9px #440505,
    0 10px #440505, 0 11px #440505, 0 12px #440505, 0 13px #440505,
    0 14px #440505, 0 15px #440505, 0 16px #440505, 0 17px #440505,
    0 18px #440505, 0 19px #440505, 0 20px #440505;

  &:hover {
    transform: translateY(-2px);

    background: radial-gradient(circle, #ec6829 10%, #ec292a 60%, #c31f20 70%);
    box-shadow: 0 1px #440505, 0 2px #440505, 0 3px #440505, 0 4px #440505,
      0 5px #440505, 0 6px #440505, 0 7px #440505, 0 8px #440505, 0 9px #440505,
      0 10px #440505, 0 11px #440505, 0 12px #440505, 0 13px #440505,
      0 14px #440505, 0 15px #440505, 0 16px #440505, 0 17px #440505,
      0 18px #440505, 0 19px #440505, 0 20px #440505, 0 21px #440505,
      0 22px #440505;
  }

  &:active {
    transform: translateY(16px);
    box-shadow: 0 1px #440505, 0 2px #440505, 0 3px #440505, 0 4px #440505;
  }
`

const Label = styled.span`
  font-size: 3em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  text-transform: uppercase;
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.6);
`

interface IProps {
  label: string

  onClick?: () => any
}

export const Button: FunctionComponent<IProps> = ({ label, onClick }) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!onClick || typeof onClick !== 'function') return
    else onClick()
  }

  return (
    <Container>
      <ButtonComponent onClick={e => handleClick(e)}>
        <Label>{label}</Label>
      </ButtonComponent>
    </Container>
  )
}