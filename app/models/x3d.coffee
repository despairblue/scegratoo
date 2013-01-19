Model = require 'models/base/model'

module.exports = class X3d extends Model
  defaults:
    selectedObject:
      translation:
        x: 0
        y: 0
        z: 0
    floatingMenuObject:
      translation:
        x: 0
        y: 0
        z: 0
