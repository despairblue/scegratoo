(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle) {
    for (var key in bundle) {
      if (has(bundle, key)) {
        modules[key] = bundle[key];
      }
    }
  }

  globals.require = require;
  globals.require.define = define;
  globals.require.brunch = true;
})();

window.require.define({"test/controllers/sidebar_controller_test": function(exports, require, module) {
  var Sidebar;

  Sidebar = require('controllers/sidebar_controller');

  describe('Sidebar', function() {
    beforeEach(function() {
      return this.controller = new Sidebar();
    });
    return afterEach(function() {
      return this.controller.dispose();
    });
  });
  
}});

window.require.define({"test/controllers/x3d_controller_test": function(exports, require, module) {
  var X3d;

  X3d = require('controllers/x3d_controller');

  describe('X3d', function() {
    return beforeEach(function() {
      return this.controller = new X3d();
    });
  });
  
}});

window.require.define({"test/models/header_test": function(exports, require, module) {
  var Header;

  Header = require('models/header');

  describe('Header', function() {
    beforeEach(function() {
      return this.model = new Header();
    });
    afterEach(function() {
      return this.model.dispose();
    });
    return it('should contain 4 items', function() {
      return expect(this.model.get('items')).to.have.length(5);
    });
  });
  
}});

window.require.define({"test/models/sidebar_test": function(exports, require, module) {
  var Sidebar;

  Sidebar = require('models/sidebar');

  describe('Sidebar', function() {
    return beforeEach(function() {
      return this.model = new Sidebar();
    });
  });
  
}});

window.require.define({"test/test-helpers": function(exports, require, module) {
  var chai, sinonChai;

  chai = require('chai');

  sinonChai = require('sinon-chai');

  chai.use(sinonChai);

  module.exports = {
    expect: chai.expect,
    sinon: require('sinon')
  };
  
}});

window.require.define({"test/views/header_view_test": function(exports, require, module) {
  var Header, HeaderView, HeaderViewTest, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  Header = require('models/header');

  HeaderView = require('views/header_view');

  HeaderViewTest = (function(_super) {

    __extends(HeaderViewTest, _super);

    function HeaderViewTest() {
      return HeaderViewTest.__super__.constructor.apply(this, arguments);
    }

    HeaderViewTest.prototype.renderTimes = 0;

    HeaderViewTest.prototype.render = function() {
      HeaderViewTest.__super__.render.apply(this, arguments);
      return this.renderTimes += 1;
    };

    return HeaderViewTest;

  })(HeaderView);

  describe('HeaderView', function() {
    beforeEach(function() {
      this.model = new Header();
      return this.view = new HeaderViewTest({
        model: this.model
      });
    });
    afterEach(function() {
      this.view.dispose();
      return this.model.dispose();
    });
    it('should display 4 links', function() {
      return expect(this.view.$el.find('a')).to.have.length(5);
    });
    return it('should re-render on login event', function() {
      expect(this.view.renderTimes).to.equal(1);
      mediator.publish('loginStatus');
      return expect(this.view.renderTimes).to.equal(2);
    });
  });
  
}});

window.require.define({"test/views/home_page_view_test": function(exports, require, module) {
  var HomePageView;

  HomePageView = require('views/home_page_view');

  describe('HomePageView', function() {
    beforeEach(function() {
      return this.view = new HomePageView();
    });
    afterEach(function() {
      return this.view.dispose();
    });
    return it('should auto-render', function() {
      return expect(this.view.$el.find('h1')).to.have.length(1);
    });
  });
  
}});

window.require.define({"test/views/sidebar_view_test": function(exports, require, module) {
  var Sidebar, SidebarView, mediator;

  mediator = require('mediator');

  Sidebar = require('models/sidebar');

  SidebarView = require('views/sidebar_view');

  describe('SidebarView', function() {
    beforeEach(function() {
      this.model = new Sidebar();
      return this.view = new SidebarView({
        model: this.model
      });
    });
    afterEach(function() {
      this.view.dispose();
      return this.model.dispose();
    });
    it('should contain only one element when home view is active', function() {
      mediator.publish('navigation:change', {
        activeView: 'home-page'
      });
      return expect(this.view.$el.children()).to.have.length(1);
    });
    it('should contain 3 buttons when x3d view is active', function() {
      mediator.publish('navigation:change', {
        activeView: 'x3d-page'
      });
      return expect(this.view.$el.find('button')).to.have.length(3);
    });
    return it('input forms should contain the values 1, 2 and 3 when x3d view is active', function() {
      var object;
      object = {
        parentElement: {
          getAttribute: function() {
            return '1 2 3';
          }
        }
      };
      mediator.publish('navigation:change', {
        activeView: 'x3d-page'
      });
      mediator.publish('x3d:object:select', object);
      expect((this.view.$el.find('#x'))[0]).to.have.property('value', '1');
      expect((this.view.$el.find('#y'))[0]).to.have.property('value', '2');
      return expect((this.view.$el.find('#z'))[0]).to.have.property('value', '3');
    });
  });
  
}});

window.require.define({"test/views/x3d_view_test": function(exports, require, module) {
  var X3dView;

  X3dView = require('views/x3d_page_view');

  describe('X3dView', function() {
    beforeEach(function() {
      return this.view = new X3dView();
    });
    afterEach(function() {
      return this.view.dispose();
    });
    return it('should contain 1 x3d node', function() {
      return expect(this.view.$el.find('x3d')).to.have.length(1);
    });
  });
  
}});

window.require('test/controllers/sidebar_controller_test');
window.require('test/controllers/x3d_controller_test');
window.require('test/models/header_test');
window.require('test/models/sidebar_test');
window.require('test/views/header_view_test');
window.require('test/views/home_page_view_test');
window.require('test/views/sidebar_view_test');
window.require('test/views/x3d_view_test');
