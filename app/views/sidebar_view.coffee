View = require 'views/base/view'
template = require 'views/templates/sidebar'

module.exports = class SidebarView extends View
  template: template
  id: 'sidebar'
  className: 'sidebar'
  container: '#sidebar-container'
  autoRender: true

  initialize: ->
    super

    @modelBind 'change', @render

    @subscribeEvent 'navigation:change', (attributes) =>
      @model.set attributes

    @subscribeEvent 'x3d:object:select', (object) =>
      transform = object.parentElement.getAttribute('translation').split(' ')
      selectedObject = @model.get('selectedObject')
      selectedObject.translation.x = transform[0]
      selectedObject.translation.y = transform[1]
      selectedObject.translation.z = transform[2]
      @render()

    @delegate 'click', '#btn_add', @btnAdd
    @delegate 'click', '#btn_remove', @btnRemove
    @delegate 'click', '#btn_update', @btnUpdate

  btnAdd: (event) =>
    @publishEvent 'sidebar:btn_add:click', event

  btnRemove: (event) =>
    @publishEvent 'sidebar:btn_remove:click', event

  btnUpdate: (event) =>
    @publishEvent 'sidebar:btn_update:click', event

