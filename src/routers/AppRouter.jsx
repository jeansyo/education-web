import React, { useEffect } from 'react'

import { BrowserRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import PrivateRouter from './PrivateRouter'
import PublicRouter from './PublicRouter'
import { __authRenew } from '../actions/authActions'

import Logo from '../assets/logo.jpg'

export default function AppRouter() {
  
  const { user } = useSelector(state => state.auth)
  const { checking } = useSelector(state => state.ui)
  const dispatch = useDispatch()
  
  useEffect(() => {
  
    dispatch( __authRenew() )

  }, [])

  if(checking) {
    return (
      <div
        className='w-100 d-flex justify-content-center align-items-center flex-column'
        style={{
          height: '100vh'
        }}
      >
        <img
          alt="Educational App"
          src={Logo}
          style={{
            width: '13rem',
            height: '13rem',
            objectFit: 'contain',
            borderRadius: '1rem',
          }}
        />
        <h2
          className='text-center text-gray mt-2'
        >
          Cargando...
        </h2>
      </div>
    )
  }
  
  
  return (
    <BrowserRouter
    >
        {
            !!user
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
