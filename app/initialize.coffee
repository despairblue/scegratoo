Application = require 'application'
routes = require 'routes'

# Initialize the application on DOM ready event.
$ ->
  $.ajaxPrefilter (options, originalOptions, jqXHR) ->
    options.url = "http://localhost:8000/api/v1" + options.url

    undefined # return value affects dataType

  new Application {
    title: 'SceGraToo',
    controllerSuffix: '-controller',
    routes
  }
