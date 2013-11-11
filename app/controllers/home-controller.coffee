Controller = require 'controllers/base/controller'
HomePageView = require 'views/home-page-view'
HomeSidebarView = require 'views/home-sidebar-view'
ProjectsView = require 'views/projects-view'
Projects = require 'models/projects'
Sidebar = require 'models/sidebar'

module.exports = class HomeController extends Controller
  index: ->
    @view = new HomePageView region: 'main'

  beforeAction: ->
    super

    @compose 'sidebar', HomeSidebarView,
      model: new Sidebar
      region: 'sidebar'

    projects = new Projects
    projects.fetch().then =>
      @compose 'projects', ProjectsView,
        collection: projects
