mediator = require 'mediator'

# Application-specific view helpers
# http://handlebarsjs.com/#helpers
# --------------------------------

Handlebars.registerHelper 'match', (first, second, options) ->
  if first is second
    options.fn(this)

# Map helpers
# -----------

# Make 'with' behave a little more mustachey
Handlebars.registerHelper 'with', (context, options) ->
  if not context or Handlebars.Utils.isEmpty context
    options.inverse(this)
  else
    options.fn(context)

# Inverse for 'with'
Handlebars.registerHelper 'without', (context, options) ->
  inverse = options.inverse
  options.inverse = options.fn
  options.fn = inverse
  Handlebars.helpers.with.call(this, context, options)

# Get Chaplin-declared named routes. {{#url "like" "105"}}{{/url}}
Handlebars.registerHelper 'url', (routeName, params...) ->
  url = null
  mediator.publish '!router:reverse', routeName, params, (result) ->
    url = result
  "/#{url}"