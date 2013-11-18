Model = require 'models/base/model'

module.exports = class Header extends Model
  defaults:
    items: [
      # {href: '/test/', title: 'App Tests'},
      {href: 'http://localhost:8000/api/v1/swagger_doc.json', title: 'Docs'},
      {href: '/', title: 'Home'},
      # {href: 'https://github.com/brunch/brunch', title: 'Built with Brunch'},
      {href: '/X3D/', title: 'X3D View'}
    ]
