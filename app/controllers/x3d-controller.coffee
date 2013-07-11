Controller = require 'controllers/base/controller'
X3dPageView = require 'views/x3d-page-view'
SidebarView = require 'views/sidebar-view'
Sidebar = require 'models/sidebar'
x3dom = require 'x3dom'

module.exports = class X3dsController extends Controller
  historyURL: 'x3d'

  index: ->
    x3dom.unload()
    @view = new X3dPageView region: 'main'
    x3dom.load()

  beforeAction: ->
    super
    @compose 'sidebar', SidebarView,
      model: new Sidebar
      region: 'sidebar'

  dispose: ->
    super
    x3dom.unload()
