Model = require 'models/base/model'

module.exports = class Sidebar extends Model
  defaults: {
    selectedObject:
      translation:
        x: 0
        y: 0
        z: 0
  }
