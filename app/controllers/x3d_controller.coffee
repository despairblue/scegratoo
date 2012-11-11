Controller = require 'controllers/base/controller'
X3dPageView = require 'views/x3d_page_view'

module.exports = class X3dsController extends Controller
  historyURL: 'x3d'

  show: ->
    @view = new X3dPageView()
    x3dom.load()
