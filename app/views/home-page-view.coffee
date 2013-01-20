template = require 'views/templates/home'
PageView = require 'views/base/page-view'

module.exports = class HomePageView extends PageView
  template: template
  className: 'home-page'
  id: 'home-page'