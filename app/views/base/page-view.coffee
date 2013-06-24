View = require 'views/base/view'

module.exports = class PageView extends View
  container: '#page-container'
  autoRender: yes
  renderedSubviews: no

  initialize: ->
    super
    if @model or @collection
      rendered = no
      @listenTo @model, 'change', =>
        @render() unless rendered
        rendered = yes

  getNavigationData: ->
    activeView: @id

  renderSubviews: ->
    return

  render: ->
    super
    unless @renderedSubviews
      @renderSubviews()
      @renderedSubviews = yes
    @publishEvent 'navigation:change', @getNavigationData()
