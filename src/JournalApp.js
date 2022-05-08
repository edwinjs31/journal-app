import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { AppRouter } from './routers/AppRouter'

export const JournalApp = () => {

  return (
    //Al igual que el contex, el store de redux tambien utiliza 'Provider' para proveer infirmacion al resto de componentes
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}
