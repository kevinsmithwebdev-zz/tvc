import './styles/index.css'

// import action creators

import {
  incrementCounter,
  decrementCounter,
  resetCounter,
  setCounter
} from './actions/counter'

// create redux store

import configureStore from './store/configureStore'
const store = configureStore()

// UI update function

const updateCounter = () => $counterDisplay.innerHTML = store.getState().counter.number

// subscribe UI update function

store.subscribe(updateCounter)

// caching DOM selectors

const $counterDisplay   = document.querySelector('#counter-display')
const $counterBtns      = document.querySelectorAll('.btn-counter')
const $counterSetField  = document.querySelector('#counter-set-field')

// adding button listeners

for (let $btn of $counterBtns) {
  $btn.addEventListener('click', counterButtonListener)
}

// handling button clicks

function counterButtonListener() {
  switch (this.name) {
    case 'inc':
      store.dispatch(incrementCounter())
      break
    case 'dec':
      store.dispatch(decrementCounter())
      break
    case 'reset':
      store.dispatch(resetCounter())
      break
    case 'set':
      let newNum = Math.round($counterSetField.value)
      if (newNum >= 0)
        store.dispatch(setCounter(newNum))
      $counterSetField.value = 0
      break
    default:
  }
}
