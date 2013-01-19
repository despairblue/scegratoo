Controller  = require 'controllers/base/controller'
X3d         = require 'models/x3d'
X3dPageView = require 'views/x3d_page_view'

module.exports = class X3dController extends Controller
  historyURL: 'x3d'

  show: ->
    x3dom.unload()
    @model = new X3d()
    @view = new X3dPageView({@model})
    x3dom.load()

  dispose: ->
    super
    x3dom.unload()
