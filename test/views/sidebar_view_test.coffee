mediator = require 'mediator'
Sidebar = require 'models/sidebar'
SidebarView = require 'views/sidebar_view'

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

