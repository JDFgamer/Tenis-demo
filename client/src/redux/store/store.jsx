import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducer/reduce'

const store = configureStore({
  reducer: rootReducer,
})

export default store