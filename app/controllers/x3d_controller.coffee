Controller = require 'controllers/base/controller'
X3dPageView = require 'views/x3d_page_view'

module.exports = class X3dController extends Controller
  historyURL: 'x3d'

  show: ->
    x3dom.unload()
    @view = new X3dPageView()
    x3dom.load()

  dispose: ->
    super
    x3dom.unload()
