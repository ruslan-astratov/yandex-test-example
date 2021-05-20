import React from "react"

import logo from "../src/assets/yandexLogo.png"

import "./App.css"

import { connect } from 'react-redux'

// Импортирую синхронные экшены
import { setInputValInState } from './redux/actions/searchActions'

import { showModalWindow } from './redux/actions/searchActions'

import { hideModalWindow } from './redux/actions/searchActions'

import { clearFindingBooks } from './redux/actions/searchActions'







// Импортирую асинхронный экшен
import { fetchToFindSomeBook } from './redux/actions/searchActions'




class App extends React.Component {


  // При вводе данных в поисковой инпут
  handleChange = (e)=> {

    clearTimeout(this.timerID)

    let textFromInput = e.target.value.toLowerCase().trimStart()

    

    textFromInput = textFromInput.replace(/\s+/g, " ")

    this.props.setInputValInState(textFromInput)


    textFromInput = textFromInput.replace(/\s/g, "+")


    // И в случае, если инпут НЕ пустой, запускаем асинхронный экшен - с фетч запросом за нужными данными

    if(textFromInput !== "") {

      let trimmedString = textFromInput

      // Проверяем является ли последний символ знаком "+".  Если да - удаляем этот последний символ
      if(textFromInput[textFromInput.length - 1] === "+") {

         trimmedString = textFromInput.substring(0, textFromInput.length -1 );
        console.log("Обрезанная строка trimmedString", trimmedString)

      }


      this.timerID = setTimeout( ()=> {
        // Делаем фетч-запрос , передавая функции поисковую строку
        this.props.fetchToFindSomeBook(trimmedString)
      }, 1000 )

    }

    else {
      // Очищаем список найденных фильмов
      this.props.clearFindingBooks()
    }


  }

  // При нажатии на сниппет - открывается модальное окно
  handleClickOnSnippet = ()=> {
    this.props.showModalWindow()
  }



  componentWillUnmount() {
    clearTimeout(this.timerID)
  }
  


  render() {

    return(
      <div className="app">

        <div className="wrapper-for-logo-and-heading">
          <img className="yandexLogo" src={logo}></img>
          <span className="logo-capture">Книги</span>
        </div>

        <div className="wrapper-for-search-input-and-button">
          <input value={this.props.searchState.inputValue} className="search-input" type="search" placeholder="Введите название книги" onChange={this.handleChange}/>
          <button className="search-button" onClick={()=> this.props.fetchToFindSomeBook(this.props.searchState.inputValue)}>Найти</button>
        </div>

        <ul className="list-for-finding-books">

          {this.props.searchState.isLoading && (
            <h3>Идёт загрузка...</h3>
          )}

          {this.props.searchState.errors && (
            <h3>Ничего не найдено</h3>
          )}


          {this.props.searchState.findingBooks &&  (
            <li className="list-item" onClick={this.handleClickOnSnippet}>

              <img className="book-cover"  src={`http://covers.openlibrary.org/b/id/${this.props.searchState.findingBooks.docs[0].cover_i}-L.jpg`}></img>
              <div className="wrapper-for-name-and-author-book">
                <h3>{this.props.searchState.findingBooks.docs[0].title}</h3>
                <span>{this.props.searchState.findingBooks.docs[0].author_name}</span>
              </div>

            </li>
          ) }

        </ul>


        {/* увеличенное изображение с обложкой, название книги, автор, дата публикации, издатель, ISBN книги. */}

        {this.props.searchState.findingBooks && this.props.searchState.canIShowModalWindow ?  (
                <div className="modal-background" onClick={this.props.hideModalWindow}>
                  <div className="modal-window">

                    <span className="close-button" onClick={this.props.hideModalWindow}>X</span>

                    <div className="book-cover-wrapper">
                      <img className="book-cover-in-modal-window" src={`http://covers.openlibrary.org/b/id/${this.props.searchState.findingBooks.docs[0].cover_i}-L.jpg`}></img>
                    </div>

                    <span>Название:</span>
                    <h3 className="book-name">{this.props.searchState.findingBooks.docs[0].title}</h3>

                    <span>Автор:</span>
                    <p className="book-desc">{this.props.searchState.findingBooks.docs[0].author_name}</p>

                    <span>Год публикации:</span>
                    <p className="book-desc">{this.props.searchState.findingBooks.docs[0].first_publish_year}</p>

                    <span>Издатель:</span>
                    <p className="book-desc">{this.props.searchState.findingBooks.docs[0].publisher[0]}</p>

                    <span>Международный номер книги:</span>
                    <p className="book-desc">{this.props.searchState.findingBooks.docs[0].isbn[0]}</p>

                  </div>
              </div>
        ) : null }

      </div>
    )

  }
}


const mapStateToProps = store => {
  return {
    searchState: store.searchState,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchToFindSomeBook: (title) => dispatch(fetchToFindSomeBook(title)),

    setInputValInState: (text) => dispatch(setInputValInState(text)),

    showModalWindow: () => dispatch(showModalWindow()),

    hideModalWindow: () => dispatch(hideModalWindow()),

    clearFindingBooks: () => dispatch(clearFindingBooks()),
   
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
