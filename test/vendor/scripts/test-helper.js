// Create `window.describe` etc. for our BDD-like tests.
mocha.setup({ui: 'bdd'});
mocha.reporter('html');

// Create another global variable for simpler syntax.
window.expect = chai.expect;
