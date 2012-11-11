X3dView = require 'views/x3d_page_view'

describe 'X3dView', ->
  beforeEach ->
    @view = new X3dView()

  afterEach ->
    @view.dispose()

  it 'should contain 1 x3d node', ->
    expect(@view.$el.find 'x3d').to.have.length 1
