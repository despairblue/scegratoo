Controller = require 'controllers/base/controller'
HomePageView = require 'views/home-page-view'
HomeSidebarView = require 'views/home-sidebar-view'
Sidebar = require 'models/sidebar'

module.exports = class HomeController extends Controller
  index: ->
    @view = new HomePageView region: 'main'

  beforeAction: ->
    super
    @compose 'sidebar', HomeSidebarView,
      model: new Sidebar
      region: 'sidebar'
