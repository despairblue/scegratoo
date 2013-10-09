# The application object.
module.exports = class Application extends Chaplin.Application
  title: 'SceGraToo'
  # Set your application name here so the document title is set to
  # “Controller title – Site title” (see Chaplin.Layout#adjustTitle)
  # title: 'Brunch example application'

  # Create additional mediator properties.
  initMediator: ->
    # Add additional application-specific properties and methods
    # e.g. Chaplin.mediator.prop = null

    # Seal the mediator.
    super
