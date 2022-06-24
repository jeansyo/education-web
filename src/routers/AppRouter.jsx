import React from 'react'

import { BrowserRouter } from 'react-router-dom'

import PrivateRouter from './PrivateRouter'
import PublicRouter from './PublicRouter'


export default function AppRouter() {
  return (
    <BrowserRouter>
        {
            true
                ? (
                    <PrivateRouter/>
                )
                : (
                    <PublicRouter/>
                )
        }

</BrowserRouter>
  )
}
