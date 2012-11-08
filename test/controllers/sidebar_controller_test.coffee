Sidebar = require 'controllers/sidebar_controller'

describe 'Sidebar', ->
  beforeEach ->
    @controller = new Sidebar()

  afterEach ->
    @controller.dispose()
