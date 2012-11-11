Model = require 'models/base/model'

module.exports = class Header extends Model
  defaults:
    items: [
      {href: '/test/', title: 'App Tests'},
      {href: 'https://github.com/despairblue/scegratoo', title: 'Docs'},
      {href: 'https://github.com/despairblue/scegratoo/issues', title: 'Github Issues'},
      {href: 'https://github.com/brunch/brunch', title: 'Built with Brunch'},
      {href: '/X3D/', title: 'X3D View'}
    ]
