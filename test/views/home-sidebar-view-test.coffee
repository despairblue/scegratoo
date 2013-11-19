HomeSidebarView = require 'views/home-sidebar-view'

describe 'HomeSidebarView', ->
  beforeEach ->
    @view = new HomeSidebarView()

  afterEach ->
    @view.dispose()

  it 'should contain only one element', ->
    @view.$el.children().length.should.equal 2
