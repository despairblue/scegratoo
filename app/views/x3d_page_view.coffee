template = require 'views/templates/x3d'
PageView = require 'views/base/page_view'

module.exports = class X3dPageView extends PageView
  template: template
  className: 'x3d-page'
  id: 'x3d-page'

  # should be in the model
  offset: 0
  currentObject = null
  floatingMenuObject = null
  pageX: 0
  pageY: 0

  initialize: ->
    super
    @subscribeEvent 'sidebar:btn_add:click', (attributes) =>
      @addObject(attributes)
    @subscribeEvent 'sidebar:btn_remove:click', (attributes) =>
      @removeObject(attributes)
    @subscribeEvent 'sidebar:btn_update:click', (attributes) =>
      @updateObject(attributes)
    $('#page-container').on 'mousemove', 'canvas', (e) =>
      @pageX = e.pageX
      @pageY = e.pageY
    $('#page-container').on 'change', '#trans-x', (e) =>
      obj = @toModelObject(@floatingMenuObject)
      @floatingMenuObject.parentElement.setAttribute('translation',
      "#{e.target.value} #{obj.translation.y} #{obj.translation.z}")
    $('#page-container').on 'change', '#trans-y', (e) =>
      obj = @toModelObject(@floatingMenuObject)
      @floatingMenuObject.parentElement.setAttribute('translation',
      "#{obj.translation.x} #{e.target.value} #{obj.translation.z}")
    $('#page-container').on 'change', '#trans-z', (e) =>
      obj = @toModelObject(@floatingMenuObject)
      @floatingMenuObject.parentElement.setAttribute('translation',
      "#{obj.translation.x} #{obj.translation.y} #{e.target.value}")

  addObject: (event) =>
    box       = document.createElement('Box')
    shape     = document.createElement('Shape')
    transform = document.createElement('Transform')

    transform.setAttribute('translation', "#{@offset} 0 0")
    shape.appendChild(box)
    shape.setAttribute('id', @offset)
    transform.appendChild(shape)
    window.root.appendChild(transform)
    $(shape).on 'click', @select
    $(shape).on 'mousemove', @hover
    $(shape).on 'mouseleave', @leave
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

  document.createElementWithCallback = (obj_name, callback, event_type) =>
    obj = document.createElement(obj_name)

    obj.addEventListener(event_type, callback)
    console.log 'addEventListener does not work'

    $(obj).click(callback)

    return obj

  select: ( event ) =>
    @currentObject = event.target
    @publishEvent 'x3d:object:select', @currentObject

  hover: (e) =>
    @floatingMenuObject = e.target
    if $('#floating-menu-container').css('display') is 'none'
      $('#floating-menu-container').
      css('left', @pageX - 5).
      css('top', @pageY - 5)
      $('#floating-menu-container').fadeIn()

  leave: (e) =>
    $('#floating-menu-container').fadeOut()

  toModelObject: (obj) ->
    returnObject =
      translation:
        x: 0
        y: 0
        z: 0
    transform = obj.parentElement.getAttribute('translation').split(' ')
    returnObject.translation.x = transform[0]
    returnObject.translation.y = transform[1]
    returnObject.translation.z = transform[2]
    returnObject
