HomeSidebarView = require 'views/home-sidebar-view'

describe 'HomeSidebarView', ->
  beforeEach ->
    @view = new HomeSidebarView()

  afterEach ->
    @view.dispose()

  it 'should contain only one element', ->
    expect(@view.$el.children()).to.have.length 1
