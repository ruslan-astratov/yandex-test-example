import {

  FETCH_STARTED,
  SUCCESS_GET_SOME_BOOK_FROM_FETCH,
  FAILURE_FETCH_TO_GET_SOME_BOOK,
  SET_INPUT_VAL_IN_STATE,
  SHOW_MODAL_WINDOW,
  HIDE_MODAL_WINDOW,
  CLEAR_FINDING_BOOK

} from '../actions/searchActions'



const initialState = {

  inputValue: "",

  isLoading: false,

  findingBooks: null,

  errors: null,

  // Показывать ли модальное окно?
  canIShowModalWindow: false

}



export function searchReducer(state = initialState, action) {
  switch (action.type) {

    
    case SET_INPUT_VAL_IN_STATE:
      return { ...state, inputValue: action.payload }


    case FETCH_STARTED:
      return { ...state, isLoading: true, errors: null, findingBooks: null }

    case SUCCESS_GET_SOME_BOOK_FROM_FETCH:
      return { ...state, isLoading: false, errors: null, findingBooks: action.payload }

    case FAILURE_FETCH_TO_GET_SOME_BOOK:
      return { ...state, isLoading: false, errors: action.payload, findingBooks: null }


    case  SHOW_MODAL_WINDOW:
      return { ...state, canIShowModalWindow: true }

    case  HIDE_MODAL_WINDOW:
      return { ...state, canIShowModalWindow: false }
      
    case  CLEAR_FINDING_BOOK:
      return { ...state, findingBooks: null, errors: null }

    default:
      return state
  }
}
