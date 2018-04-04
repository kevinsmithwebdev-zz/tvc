import './styles/index.css'

// import action creators

// *** ADD CODE HERE

// create redux store

// *** ADD CODE HERE

// UI update function

// *** ADD CODE HERE

// subscribe UI update function

// *** ADD CODE HERE

// caching DOM selectors

const $counterBtns      = document.querySelectorAll('.btn-counter')
// const $counterDisplay   = document.querySelector('#counter-display')
// const $counterSetField  = document.querySelector('#counter-set-field')

// adding button listeners

for (let $btn of $counterBtns) {
  $btn.addEventListener('click', counterButtonListener)
}

// handling button clicks

function counterButtonListener() {
  switch (this.name) {
    case 'inc':
      // REPLACE CODE HERE
      console.log("increment button pressed")
      break

    case 'dec':
      // REPLACE CODE HERE
      console.log("decrement button pressed")
      break

    case 'reset':
      // REPLACE CODE HERE
      console.log("reset button pressed")
      break

    case 'set':
      // REPLACE CODE HERE
      console.log("set button pressed")
      break

    default:
  }
}
