template = require 'views/templates/home'
View = require 'views/base/view'

module.exports = class HomePageView extends View
  autoRender: true
  template: template
  className: 'home-page'
  id: 'home-page'
