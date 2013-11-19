ProjectsView = require 'views/projects-view'
Projects = require 'models/projects'
Project = require 'models/project'

describe 'ProjectsView', ->
  beforeEach ->
    p1 = new Project id:0, title:'title'
    p2 = new Project id:1, title:'title2'
    projects = new Projects [p1, p2]
    @view = new ProjectsView collection: projects
    @view.render()

  afterEach ->
    @view.dispose()

  it 'should contain only one element', ->
    @view.$el.children().length.should.equal 2
