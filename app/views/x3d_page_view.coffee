template = require 'views/templates/x3d'
PageView = require 'views/base/page_view'

module.exports = class X3dPageView extends PageView
  template: template
  className: 'x3d-page'
  id: 'x3d-page'
  offset: 0
  currentObject = null

  initialize: ->
    super
    @subscribeEvent 'sidebar:btn_add:click', (attributes) =>
      @addObject(attributes)
    @subscribeEvent 'sidebar:btn_remove:click', (attributes) =>
      @removeObject(attributes)
    @subscribeEvent 'sidebar:btn_update:click', (attributes) =>
      @updateObject(attributes)

  addObject: (event) =>
    transform = document.createElement('Transform')
    shape = document.createElementWithCallback('Shape', @select, "click")
    box   = document.createElement('Box')
    transform.setAttribute('translation', "#{@offset} 0 0")
    shape.appendChild(box)
    transform.appendChild(shape)
    window.root.appendChild(transform)
    @offset += 3

  removeObject: (event) =>
    if @currentObject
      pa = @currentObject.parentElement
      pa.removeChild(@currentObject)
      @currentObject = null

  updateObject: (attributes) =>
    translation = @currentObject.parentElement
    translation.setAttribute('translation',
    "#{attributes.selectedObject.translation.x} #{attributes.selectedObject.translation.y} #{attributes.selectedObject.translation.z}")

  document.createElementWithCallback = (obj_name, callback, event_type) ->
    obj = document.createElement(obj_name)

    obj.addEventListener(event_type, callback)
    console.log 'addEventListener does not work'

    obj.onclick = callback if event_type is 'click'
    return obj

  select: ( event ) =>
    @currentObject = event.target
    @publishEvent 'x3d:object:select', @currentObject