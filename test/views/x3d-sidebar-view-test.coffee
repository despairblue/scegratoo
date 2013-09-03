mediator = (require 'chaplin').mediator
Sidebar = require 'models/sidebar'
X3dSidebarView = require 'views/x3d-sidebar-view'

describe 'X3dSidebarView', ->
  beforeEach ->
    @model = new Sidebar()
    @view = new X3dSidebarView({@model})

  afterEach ->
    @model.dispose()
    @view.dispose()

  it 'should contain 3 buttons when x3d view is active', ->
    expect(@view.$el.find 'button').to.have.length 3

  it 'should contain 6 inputs when x3d view is active', ->
    expect(@view.$el.find 'input').to.have.length 6

  it 'input forms should contain the values 1, 2 and 3 when x3d view is active', ->
    object = parentElement:
      getAttribute: ->
        '1 2 3'
    mediator.publish 'x3d:object:select', object
    expect( (@view.$el.find '#x')[0] ).to.have.property 'value', '1'
    expect( (@view.$el.find '#y')[0] ).to.have.property 'value', '2'
    expect( (@view.$el.find '#z')[0] ).to.have.property 'value', '3'
