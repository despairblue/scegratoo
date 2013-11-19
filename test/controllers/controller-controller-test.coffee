Controller = require 'controllers/base/controller'

describe 'Controller', ->
  beforeEach ->
    @controller = new Controller()

  afterEach ->
    @controller.dispose()

  it 'should just work', ->
    expect(@controller).to.exist
