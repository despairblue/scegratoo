Header = require 'models/header'

describe 'Header', ->
  beforeEach ->
    @model = new Header()
    # chai.should()

  afterEach ->
    @model.dispose()

  it 'should contain 3 items', ->
    (@model.get 'items').length.should.equal 3
