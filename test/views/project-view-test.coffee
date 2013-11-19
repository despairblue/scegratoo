ProjectView = require 'views/project-view'
Project = require 'models/project'

describe 'ProjectView', ->
  beforeEach ->
    @view = new ProjectView model:new Project({id: 0,title: 'test'})
    @view.render()

  afterEach ->
    @view.dispose()

  it 'should contain only one element', ->
    @view.$el.children().length.should.equal 1
