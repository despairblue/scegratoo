X3dController = require 'controllers/x3d-controller'

describe 'X3d Controller', ->
  beforeEach ->
    @controller = new X3dController()

  afterEach ->
    @controller.dispose()

  it '@beforeAction() should call @compose() 3 times', ->
    sinon.stub @controller, 'compose'

    @controller.beforeAction()
    @controller.compose.should.have.been.calledThrice
