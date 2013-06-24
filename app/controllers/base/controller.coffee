Chaplin = require 'chaplin'
SiteView = require 'views/site-view'
HeaderView = require 'views/header-view'
SidebarView = require 'views/sidebar-view'
Header = require 'models/header'
Sidebar = require 'models/sidebar'

module.exports = class Controller extends Chaplin.Controller
  beforeAction: ->
    @compose 'site', SiteView
    @compose 'header', HeaderView, {model: new Header}
    @compose 'sidebar', SidebarView, {model: new Sidebar}
