template = require 'views/templates/x3d'
PageView = require 'views/base/page_view'

module.exports = class X3dPageView extends PageView
  template: template
  className: 'x3d-page'
  id: 'x3d-page'
