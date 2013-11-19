models = [
  'header'
  'project'
  'projects'
  'sidebar'
]
views = [
  'header'
  'home-page'
  'home-sidebar'
  'x3d'
  'x3d-sidebar'
]
controllers = [
  'controller'
  'x3d'
  'home'
]


for model in models
  require './models/' + model + '-test'

for view in views
  require './views/' + view + '-view-test'

for controller in controllers
  require './controllers/' + controller + '-controller-test'
