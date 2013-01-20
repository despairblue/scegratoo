mediator = require 'mediator'
Sidebar = require 'models/sidebar'
SidebarView = require 'views/sidebar-view'

describe 'SidebarView', ->
  beforeEach ->
    @model = new Sidebar()
    @view = new SidebarView({@model})

  afterEach ->
    @view.dispose()
    @model.dispose()

  it 'should contain only one element when home view is active', ->
    mediator.publish 'navigation:change', {activeView:'home-page'}
    expect(@view.$el.children()).to.have.length 1

  it 'should contain 3 buttons when x3d view is active', ->
    mediator.publish 'navigation:change', {activeView:'x3d-page'}
    expect(@view.$el.find 'button').to.have.length 3

  it 'should contain 6 inputs when x3d view is active', ->
    mediator.publish 'navigation:change', {activeView:'x3d-page'}
    expect(@view.$el.find 'input').to.have.length 6

  it 'input forms should contain the values 1, 2 and 3 when x3d view is active', ->
    object = parentElement:
      getAttribute: ->
        '1 2 3'
    mediator.publish 'navigation:change', {activeView:'x3d-page'}
    mediator.publish 'x3d:object:select', object
    expect( (@view.$el.find '#x')[0] ).to.have.property 'value', '1'
    expect( (@view.$el.find '#y')[0] ).to.have.property 'value', '2'
    expect( (@view.$el.find '#z')[0] ).to.have.property 'value', '3'

