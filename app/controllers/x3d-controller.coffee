Controller = require 'controllers/base/controller'
X3dPageView = require 'views/x3d-page-view'
X3dSidebarView = require 'views/x3d-sidebar-view'
Sidebar = require 'models/sidebar'
x3dom = require 'x3dom'

module.exports = class X3dController extends Controller
  historyURL: 'x3d'

  index: ->
    @view = new X3dPageView region: 'main'
    x3dom.reload()

  beforeAction: ->
    super
    @compose 'sidebar', X3dSidebarView,
      model: new Sidebar
      region: 'sidebar'

  dispose: ->
    super
