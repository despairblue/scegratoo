Controller = require 'controllers/base/controller'
Sidebar = require 'models/sidebar'
SidebarView = require 'views/sidebar-view'

module.exports = class SidebarController extends Controller
  initialize: ->
    super
    @model = new Sidebar()
    @view = new SidebarView({@model})
