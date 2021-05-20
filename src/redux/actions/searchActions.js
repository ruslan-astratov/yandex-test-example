export const FETCH_STARTED = 'FETCH_STARTED'
export const SUCCESS_GET_SOME_BOOK_FROM_FETCH = 'SUCCESS_GET_SOME_BOOK_FROM_FETCH'
export const FAILURE_FETCH_TO_GET_SOME_BOOK = 'FAILURE_FETCH_TO_GET_SOME_BOOK'

export const SET_INPUT_VAL_IN_STATE = 'SET_INPUT_VAL_IN_STATE'
export const SHOW_MODAL_WINDOW = 'SHOW_MODAL_WINDOW'

export const HIDE_MODAL_WINDOW = 'HIDE_MODAL_WINDOW'

export const CLEAR_FINDING_BOOK = 'CLEAR_FINDING_BOOK'










// Экшен, который при вводе в инпут устанавливает значение инпута в стейn
export const setInputValInState = (text) => ({
  type: SET_INPUT_VAL_IN_STATE,
  payload: text
});




// Асинхронный экшен - поисковый фетч-запрос  -> ищем книгу 
export const fetchToFindSomeBook = (title) => {

  return dispatch => {

    dispatch(fetchStarted());
    // Сюда в качестве title будет попадать преобразованная строка, в которой пробелы будут заменены на плюсы
    fetch(`http://openlibrary.org/search.json?title=${title}`)
      .then(responseBody => responseBody.json())
      .then(jsObj => {

        if(jsObj.docs.length > 0) {
          console.log("Ответ, который пришёл с сервера", jsObj)
          dispatch(successGetSomeBookFromFetch(jsObj));
        }

        else {
          dispatch(failureFetchToGetSomeBook());
        }

      })

      .catch(err => {
        dispatch(failureFetchToGetSomeBook(err));
      });
  };
};


// Начали фетч-запрос. Переменную isLoading переводим в true
const fetchStarted = () => ({
  type: FETCH_STARTED
});

// Успешно получили данные. Переменную isLoading переводим в false и сохраняем объект в стейте 
const successGetSomeBookFromFetch = (jsObj) => ({
  type: SUCCESS_GET_SOME_BOOK_FROM_FETCH,
  payload: jsObj
});

// Получили ошибку . Переменную isLoading переводим в false
const failureFetchToGetSomeBook = (err = {message: "Ошибка fetch-запроса"}) => ({
  type:  FAILURE_FETCH_TO_GET_SOME_BOOK,
  payload: err
});


// Экшен, который показывает модальное окно
export const showModalWindow = () => ({
  type: SHOW_MODAL_WINDOW
});


// Экшен, который скрывает модальное окно
export const hideModalWindow = () => ({
  type: HIDE_MODAL_WINDOW
});


// В случае, если мы очистим поисковой инпут, у нас удалится найденная нами книга 
export const clearFindingBooks = () => ({
  type: CLEAR_FINDING_BOOK
});

