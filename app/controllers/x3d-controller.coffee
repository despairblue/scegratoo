Controller = require 'controllers/base/controller'
X3dPageView = require 'views/x3d-page-view'
x3dom = require 'x3dom'

module.exports = class X3dsController extends Controller
  historyURL: 'x3d'

  index: ->
    x3dom.unload()
    @view = new X3dPageView()
    x3dom.load()

  dispose: ->
    super
    x3dom.unload()
