import { combineReducers } from 'redux'
import { searchReducer } from './searchReducer'

export const rootReducer = combineReducers({
  searchState: searchReducer,
})
