HomeController = require 'controllers/home-controller'

describe 'Home Controller', ->
  beforeEach ->
    @controller = new HomeController()

  afterEach ->
    @controller.dispose()

  it '@beforeAction() should call @compose() 3 times', ->
    sinon.stub @controller, 'compose'

    @controller.beforeAction()
    @controller.compose.should.have.been.calledThrice

  # it '@index() should instantianate @view', ->
  #   @controller.index()

  #   should(@controller.view).exist
