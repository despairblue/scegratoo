Sidebar = require 'controllers/sidebar-controller'

describe 'Sidebar', ->
  beforeEach ->
    @controller = new Sidebar()

  afterEach ->
    @controller.dispose()
