template = require 'views/templates/x3d'
View = require 'views/base/view'

module.exports = class X3dPageView extends View
  template: template
  autoRender: true
  className: 'x3d-page'
  id: 'x3d-page'
  offset: 0
  # currentObject = undefined
  runtime = document.querySelector( 'x3d' )?.runtime

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
      @currentObject = undefined

  updateObject: (attributes) =>
    translation = @currentObject?.parentElement
    translation?.setAttribute('translation',
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

  calcViewPlane: ( origin ) =>
    # init width and height
    @w = @runtime.getWidth()
    @h = @runtime.getHeight()

    ray = @runtime.getViewingRay(0, h-1)
    r = ray.pos.add(ray.dir) #bottom left of viewarea

    ray = @runtime.getViewingRay(w-1, h-1)
    s = ray.pos.add(ray.dir) #bottom right of viewarea

    ray = @runtime.getViewingRay(0, 0)
    t = ray.pos.add(ray.dir) #top left of viewarea

    @uPlane = s.subtract(r).normalize()
    @vPlane = t.subtract(r).normalize()

    if arguments.length is 0
      @pPlane = r
    else
      @pPlane = x3dom.fields.SFVec3f.copy(origin)
