CollectionView = require 'views/base/collection-view'
ProjectView = require 'views/project-view'

module.exports = class ProjectsView extends CollectionView
  itemView: ProjectView
