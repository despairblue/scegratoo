// Create `window.describe` etc. for our BDD-like tests.
mocha.setup({ui: 'bdd'})
mocha.reporter('html')

// initialize chai.should (@see http://chaijs.com/guide/styles/#should)
window.should = chai.should()

// Create another global variable for simpler syntax.
window.expect = chai.expect
