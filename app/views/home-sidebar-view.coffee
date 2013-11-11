View = require 'views/base/view'
template = require 'views/templates/home-sidebar'

module.exports = class HomeSidebarView extends View
  template: template
  id: 'sidebar'
  className: 'sidebar'
  autoRender: true
  regions:
    'projects': '.projects-container'
