import React from 'react'
import { render } from 'react-dom'
import { App } from './ts/App'
import './ts/sound'

render(<App />, document.getElementById('root'))
if (module.hot) module.hot.accept()
