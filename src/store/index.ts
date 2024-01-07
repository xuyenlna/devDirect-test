import { configureStore, ThunkDispatch, ThunkAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import componentSlice from './componentSlice'

const store = configureStore({
  reducer: {
    component: componentSlice
  }
})

export type StoreState = ReturnType<typeof store.getState>
export type StoreDispatch = typeof store.dispatch
export type TypedDispatch = ThunkDispatch<any, any, any>
export type TypedThunk<ReturnType = void> = ThunkAction<ReturnType, any, unknown, any>
export const useAppDispatch = () => useDispatch<TypedDispatch>()
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector

export default store
