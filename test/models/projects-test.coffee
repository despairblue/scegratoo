Project = require 'models/project'
Projects = require 'models/projects'

describe 'Project', ->
  beforeEach ->
    @model = new Project()
    @collection = new Projects()

  afterEach ->
    @model.dispose()
    @collection.dispose()
