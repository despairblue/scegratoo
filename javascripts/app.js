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

window.require.define({"application": function(exports, require, module) {
  var Application, Chaplin, HeaderController, Layout, SidebarController, mediator, routes,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  mediator = require('mediator');

  routes = require('routes');

  HeaderController = require('controllers/header_controller');

  SidebarController = require('controllers/sidebar_controller');

  Layout = require('views/layout');

  module.exports = Application = (function(_super) {

    __extends(Application, _super);

    function Application() {
      return Application.__super__.constructor.apply(this, arguments);
    }

    Application.prototype.title = 'SceGraToo';

    Application.prototype.initialize = function() {
      Application.__super__.initialize.apply(this, arguments);
      this.initDispatcher();
      this.initLayout();
      this.initMediator();
      this.initControllers();
      this.initRouter(routes);
      return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
    };

    Application.prototype.initLayout = function() {
      return this.layout = new Layout({
        title: this.title
      });
    };

    Application.prototype.initControllers = function() {
      new HeaderController();
      return new SidebarController();
    };

    Application.prototype.initMediator = function() {
      mediator.user = null;
      return mediator.seal();
    };

    return Application;

  })(Chaplin.Application);
  
}});

window.require.define({"controllers/base/controller": function(exports, require, module) {
  var Chaplin, Controller,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      return Controller.__super__.constructor.apply(this, arguments);
    }

    return Controller;

  })(Chaplin.Controller);
  
}});

window.require.define({"controllers/header_controller": function(exports, require, module) {
  var Controller, Header, HeaderController, HeaderView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  Header = require('models/header');

  HeaderView = require('views/header_view');

  module.exports = HeaderController = (function(_super) {

    __extends(HeaderController, _super);

    function HeaderController() {
      return HeaderController.__super__.constructor.apply(this, arguments);
    }

    HeaderController.prototype.initialize = function() {
      HeaderController.__super__.initialize.apply(this, arguments);
      this.model = new Header();
      return this.view = new HeaderView({
        model: this.model
      });
    };

    return HeaderController;

  })(Controller);
  
}});

window.require.define({"controllers/home_controller": function(exports, require, module) {
  var Controller, HomeController, HomePageView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  HomePageView = require('views/home_page_view');

  module.exports = HomeController = (function(_super) {

    __extends(HomeController, _super);

    function HomeController() {
      return HomeController.__super__.constructor.apply(this, arguments);
    }

    HomeController.prototype.historyURL = 'home';

    HomeController.prototype.show = function() {
      return this.view = new HomePageView();
    };

    return HomeController;

  })(Controller);
  
}});

window.require.define({"controllers/sidebar_controller": function(exports, require, module) {
  var Controller, Sidebar, SidebarController, SidebarView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  Sidebar = require('models/sidebar');

  SidebarView = require('views/sidebar_view');

  module.exports = SidebarController = (function(_super) {

    __extends(SidebarController, _super);

    function SidebarController() {
      return SidebarController.__super__.constructor.apply(this, arguments);
    }

    SidebarController.prototype.initialize = function() {
      SidebarController.__super__.initialize.apply(this, arguments);
      this.model = new Sidebar();
      return this.view = new SidebarView({
        model: this.model
      });
    };

    return SidebarController;

  })(Controller);
  
}});

window.require.define({"controllers/x3d_controller": function(exports, require, module) {
  var Controller, X3dPageView, X3dsController,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  X3dPageView = require('views/x3d_page_view');

  module.exports = X3dsController = (function(_super) {

    __extends(X3dsController, _super);

    function X3dsController() {
      return X3dsController.__super__.constructor.apply(this, arguments);
    }

    X3dsController.prototype.historyURL = 'x3d';

    X3dsController.prototype.show = function() {
      x3dom.unload();
      this.view = new X3dPageView();
      return x3dom.load();
    };

    X3dsController.prototype.dispose = function() {
      X3dsController.__super__.dispose.apply(this, arguments);
      return x3dom.unload();
    };

    return X3dsController;

  })(Controller);
  
}});

window.require.define({"initialize": function(exports, require, module) {
  var Application;

  Application = require('application');

  $(document).on('ready', function() {
    var app;
    app = new Application();
    return app.initialize();
  });
  
}});

window.require.define({"lib/services/service_provider": function(exports, require, module) {
  var Chaplin, ServiceProvider, utils;

  utils = require('lib/utils');

  Chaplin = require('chaplin');

  module.exports = ServiceProvider = (function() {

    _(ServiceProvider.prototype).extend(Chaplin.EventBroker);

    ServiceProvider.prototype.loading = false;

    function ServiceProvider() {
      _(this).extend($.Deferred());
      utils.deferMethods({
        deferred: this,
        methods: ['triggerLogin', 'getLoginStatus'],
        onDeferral: this.load
      });
    }

    ServiceProvider.prototype.disposed = false;

    ServiceProvider.prototype.dispose = function() {
      if (this.disposed) {
        return;
      }
      this.unsubscribeAllEvents();
      this.disposed = true;
      return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
    };

    return ServiceProvider;

  })();

  /*

    Standard methods and their signatures:

    load: ->
      # Load a script like this:
      utils.loadLib 'http://example.org/foo.js', @loadHandler, @reject

    loadHandler: =>
      # Init the library, then resolve
      ServiceProviderLibrary.init(foo: 'bar')
      @resolve()

    isLoaded: ->
      # Return a Boolean
      Boolean window.ServiceProviderLibrary and ServiceProviderLibrary.login

    # Trigger login popup
    triggerLogin: (loginContext) ->
      callback = _(@loginHandler).bind(this, loginContext)
      ServiceProviderLibrary.login callback

    # Callback for the login popup
    loginHandler: (loginContext, response) =>

      eventPayload = {provider: this, loginContext}
      if response
        # Publish successful login
        @publishEvent 'loginSuccessful', eventPayload

        # Publish the session
        @publishEvent 'serviceProviderSession',
          provider: this
          userId: response.userId
          accessToken: response.accessToken
          # etc.

      else
        @publishEvent 'loginFail', eventPayload

    getLoginStatus: (callback = @loginStatusHandler, force = false) ->
      ServiceProviderLibrary.getLoginStatus callback, force

    loginStatusHandler: (response) =>
      return unless response
      @publishEvent 'serviceProviderSession',
        provider: this
        userId: response.userId
        accessToken: response.accessToken
        # etc.
  */

  
}});

window.require.define({"lib/support": function(exports, require, module) {
  var Chaplin, support, utils;

  Chaplin = require('chaplin');

  utils = require('lib/utils');

  support = utils.beget(Chaplin.support);

  module.exports = support;
  
}});

window.require.define({"lib/utils": function(exports, require, module) {
  var Chaplin, utils,
    __hasProp = {}.hasOwnProperty;

  Chaplin = require('chaplin');

  utils = Chaplin.utils.beget(Chaplin.utils);

  _(utils).extend({
    /*
      Wrap methods so they can be called before a deferred is resolved.
      The actual methods are called once the deferred is resolved.
    
      Parameters:
    
      Expects an options hash with the following properties:
    
      deferred
        The Deferred object to wait for.
    
      methods
        Either:
        - A string with a method name e.g. 'method'
        - An array of strings e.g. ['method1', 'method2']
        - An object with methods e.g. {method: -> alert('resolved!')}
    
      host (optional)
        If you pass an array of strings in the `methods` parameter the methods
        are fetched from this object. Defaults to `deferred`.
    
      target (optional)
        The target object the new wrapper methods are created at.
        Defaults to host if host is given, otherwise it defaults to deferred.
    
      onDeferral (optional)
        An additional callback function which is invoked when the method is called
        and the Deferred isn't resolved yet.
        After the method is registered as a done handler on the Deferred,
        this callback is invoked. This can be used to trigger the resolving
        of the Deferred.
    
      Examples:
    
      deferMethods(deferred: def, methods: 'foo')
        Wrap the method named foo of the given deferred def and
        postpone all calls until the deferred is resolved.
    
      deferMethods(deferred: def, methods: def.specialMethods)
        Read all methods from the hash def.specialMethods and
        create wrapped methods with the same names at def.
    
      deferMethods(
        deferred: def, methods: def.specialMethods, target: def.specialMethods
      )
        Read all methods from the object def.specialMethods and
        create wrapped methods at def.specialMethods,
        overwriting the existing ones.
    
      deferMethods(deferred: def, host: obj, methods: ['foo', 'bar'])
        Wrap the methods obj.foo and obj.bar so all calls to them are postponed
        until def is resolved. obj.foo and obj.bar are overwritten
        with their wrappers.
    */

    deferMethods: function(options) {
      var deferred, func, host, methods, methodsHash, name, onDeferral, target, _i, _len, _results;
      deferred = options.deferred;
      methods = options.methods;
      host = options.host || deferred;
      target = options.target || host;
      onDeferral = options.onDeferral;
      methodsHash = {};
      if (typeof methods === 'string') {
        methodsHash[methods] = host[methods];
      } else if (methods.length && methods[0]) {
        for (_i = 0, _len = methods.length; _i < _len; _i++) {
          name = methods[_i];
          func = host[name];
          if (typeof func !== 'function') {
            throw new TypeError("utils.deferMethods: method " + name + " notfound on host " + host);
          }
          methodsHash[name] = func;
        }
      } else {
        methodsHash = methods;
      }
      _results = [];
      for (name in methodsHash) {
        if (!__hasProp.call(methodsHash, name)) continue;
        func = methodsHash[name];
        if (typeof func !== 'function') {
          continue;
        }
        _results.push(target[name] = utils.createDeferredFunction(deferred, func, target, onDeferral));
      }
      return _results;
    },
    createDeferredFunction: function(deferred, func, context, onDeferral) {
      if (context == null) {
        context = deferred;
      }
      return function() {
        var args;
        args = arguments;
        if (deferred.state() === 'resolved') {
          return func.apply(context, args);
        } else {
          deferred.done(function() {
            return func.apply(context, args);
          });
          if (typeof onDeferral === 'function') {
            return onDeferral.apply(context);
          }
        }
      };
    }
  });

  module.exports = utils;
  
}});

window.require.define({"lib/view_helper": function(exports, require, module) {
  var mediator, utils;

  mediator = require('mediator');

  utils = require('chaplin/lib/utils');

  Handlebars.registerHelper('if_logged_in', function(options) {
    if (mediator.user) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  Handlebars.registerHelper('with', function(context, options) {
    if (!context || Handlebars.Utils.isEmpty(context)) {
      return options.inverse(this);
    } else {
      return options.fn(context);
    }
  });

  Handlebars.registerHelper('without', function(context, options) {
    var inverse;
    inverse = options.inverse;
    options.inverse = options.fn;
    options.fn = inverse;
    return Handlebars.helpers["with"].call(this, context, options);
  });

  Handlebars.registerHelper('with_user', function(options) {
    var context;
    context = mediator.user || {};
    return Handlebars.helpers["with"].call(this, context, options);
  });

  Handlebars.registerHelper('match', function(first, second, options) {
    if (first === second) {
      return options.fn(this);
    }
  });
  
}});

window.require.define({"mediator": function(exports, require, module) {
  
  module.exports = require('chaplin').mediator;
  
}});

window.require.define({"models/base/collection": function(exports, require, module) {
  var Chaplin, Collection,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    return Collection;

  })(Chaplin.Collection);
  
}});

window.require.define({"models/base/model": function(exports, require, module) {
  var Chaplin, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }

    return Model;

  })(Chaplin.Model);
  
}});

window.require.define({"models/header": function(exports, require, module) {
  var Header, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Header = (function(_super) {

    __extends(Header, _super);

    function Header() {
      return Header.__super__.constructor.apply(this, arguments);
    }

    Header.prototype.defaults = {
      items: [
        {
          href: '/test/',
          title: 'App Tests'
        }, {
          href: 'https://github.com/despairblue/scegratoo',
          title: 'Docs'
        }, {
          href: 'https://github.com/despairblue/scegratoo/issues',
          title: 'Github Issues'
        }, {
          href: 'https://github.com/brunch/brunch',
          title: 'Built with Brunch'
        }, {
          href: '/X3D/',
          title: 'X3D View'
        }
      ]
    };

    return Header;

  })(Model);
  
}});

window.require.define({"models/sidebar": function(exports, require, module) {
  var Model, Sidebar,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Sidebar = (function(_super) {

    __extends(Sidebar, _super);

    function Sidebar() {
      return Sidebar.__super__.constructor.apply(this, arguments);
    }

    Sidebar.prototype.defaults = {
      selectedObject: {
        translation: {
          x: 0,
          y: 0,
          z: 0
        }
      }
    };

    return Sidebar;

  })(Model);
  
}});

window.require.define({"routes": function(exports, require, module) {
  
  module.exports = function(match) {
    match('', 'home#show');
    return match('X3D/', 'x3d#show');
  };
  
}});

window.require.define({"views/base/collection_view": function(exports, require, module) {
  var Chaplin, CollectionView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  View = require('views/base/view');

  module.exports = CollectionView = (function(_super) {

    __extends(CollectionView, _super);

    function CollectionView() {
      return CollectionView.__super__.constructor.apply(this, arguments);
    }

    CollectionView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

    return CollectionView;

  })(Chaplin.CollectionView);
  
}});

window.require.define({"views/base/page_view": function(exports, require, module) {
  var PageView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  module.exports = PageView = (function(_super) {

    __extends(PageView, _super);

    function PageView() {
      return PageView.__super__.constructor.apply(this, arguments);
    }

    PageView.prototype.container = '#page-container';

    PageView.prototype.autoRender = true;

    PageView.prototype.renderedSubviews = false;

    PageView.prototype.initialize = function() {
      var rendered,
        _this = this;
      PageView.__super__.initialize.apply(this, arguments);
      if (this.model || this.collection) {
        rendered = false;
        return this.modelBind('change', function() {
          if (!rendered) {
            _this.render();
          }
          return rendered = true;
        });
      }
    };

    PageView.prototype.getNavigationData = function() {
      return {
        activeView: this.id
      };
    };

    PageView.prototype.renderSubviews = function() {};

    PageView.prototype.render = function() {
      PageView.__super__.render.apply(this, arguments);
      if (!this.renderedSubviews) {
        this.renderSubviews();
        this.renderedSubviews = true;
      }
      return this.publishEvent('navigation:change', this.getNavigationData());
    };

    return PageView;

  })(View);
  
}});

window.require.define({"views/base/view": function(exports, require, module) {
  var Chaplin, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  require('lib/view_helper');

  module.exports = View = (function(_super) {

    __extends(View, _super);

    function View() {
      return View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.getTemplateFunction = function() {
      return this.template;
    };

    return View;

  })(Chaplin.View);
  
}});

window.require.define({"views/header_view": function(exports, require, module) {
  var HeaderView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/header');

  module.exports = HeaderView = (function(_super) {

    __extends(HeaderView, _super);

    function HeaderView() {
      return HeaderView.__super__.constructor.apply(this, arguments);
    }

    HeaderView.prototype.template = template;

    HeaderView.prototype.id = 'header';

    HeaderView.prototype.className = 'header';

    HeaderView.prototype.container = '#header-container';

    HeaderView.prototype.autoRender = true;

    HeaderView.prototype.initialize = function() {
      HeaderView.__super__.initialize.apply(this, arguments);
      this.subscribeEvent('loginStatus', this.render);
      return this.subscribeEvent('startupController', this.render);
    };

    return HeaderView;

  })(View);
  
}});

window.require.define({"views/home_page_view": function(exports, require, module) {
  var HomePageView, PageView, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/home');

  PageView = require('views/base/page_view');

  module.exports = HomePageView = (function(_super) {

    __extends(HomePageView, _super);

    function HomePageView() {
      return HomePageView.__super__.constructor.apply(this, arguments);
    }

    HomePageView.prototype.template = template;

    HomePageView.prototype.className = 'home-page';

    HomePageView.prototype.id = 'home-page';

    return HomePageView;

  })(PageView);
  
}});

window.require.define({"views/layout": function(exports, require, module) {
  var Chaplin, Layout,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      return Layout.__super__.constructor.apply(this, arguments);
    }

    Layout.prototype.initialize = function() {
      return Layout.__super__.initialize.apply(this, arguments);
    };

    return Layout;

  })(Chaplin.Layout);
  
}});

window.require.define({"views/sidebar_view": function(exports, require, module) {
  var SidebarView, View, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/sidebar');

  module.exports = SidebarView = (function(_super) {

    __extends(SidebarView, _super);

    function SidebarView() {
      this.btnUpdate = __bind(this.btnUpdate, this);

      this.btnRemove = __bind(this.btnRemove, this);

      this.btnAdd = __bind(this.btnAdd, this);
      return SidebarView.__super__.constructor.apply(this, arguments);
    }

    SidebarView.prototype.template = template;

    SidebarView.prototype.id = 'sidebar';

    SidebarView.prototype.className = 'sidebar';

    SidebarView.prototype.container = '#sidebar-container';

    SidebarView.prototype.autoRender = true;

    SidebarView.prototype.initialize = function() {
      var _this = this;
      SidebarView.__super__.initialize.apply(this, arguments);
      this.modelBind('change', this.render);
      this.subscribeEvent('navigation:change', function(attributes) {
        return _this.model.set(attributes);
      });
      this.subscribeEvent('x3d:object:select', function(object) {
        var selectedObject, transform;
        transform = object.parentElement.getAttribute('translation').split(' ');
        selectedObject = _this.model.get('selectedObject');
        selectedObject.translation.x = transform[0];
        selectedObject.translation.y = transform[1];
        selectedObject.translation.z = transform[2];
        return _this.render();
      });
      this.delegate('click', '#btn_add', this.btnAdd);
      this.delegate('click', '#btn_remove', this.btnRemove);
      this.delegate('click', '#btn_update', this.btnUpdate);
      this.delegate('change', '#x', function(event) {
        var selectedObject;
        selectedObject = _this.model.get('selectedObject');
        return selectedObject.translation.x = event.target.value;
      });
      this.delegate('change', '#y', function(event) {
        var selectedObject;
        selectedObject = _this.model.get('selectedObject');
        return selectedObject.translation.y = event.target.value;
      });
      return this.delegate('change', '#z', function(event) {
        var selectedObject;
        selectedObject = _this.model.get('selectedObject');
        return selectedObject.translation.z = event.target.value;
      });
    };

    SidebarView.prototype.btnAdd = function(event) {
      return this.publishEvent('sidebar:btn_add:click', event);
    };

    SidebarView.prototype.btnRemove = function(event) {
      return this.publishEvent('sidebar:btn_remove:click', event);
    };

    SidebarView.prototype.btnUpdate = function(event) {
      return this.publishEvent('sidebar:btn_update:click', {
        event: event,
        selectedObject: this.model.get('selectedObject')
      });
    };

    return SidebarView;

  })(View);
  
}});

window.require.define({"views/templates/header": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n  <a class=\"header-link\" href=\"";
    foundHelper = helpers.href;
    stack1 = foundHelper || depth0.href;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "href", { hash: {} }); }
    buffer += escapeExpression(stack1) + "\">";
    foundHelper = helpers.title;
    stack1 = foundHelper || depth0.title;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</a>\n";
    return buffer;}

    foundHelper = helpers.items;
    stack1 = foundHelper || depth0.items;
    stack2 = helpers.each;
    tmp1 = self.program(1, program1, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    stack1 = stack2.call(depth0, stack1, tmp1);
    if(stack1 || stack1 === 0) { return stack1; }
    else { return ''; }});
}});

window.require.define({"views/templates/home": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<h1 id=\"scegratoo\">SceGraToo</h1>\n\n<p>This Project is part of my bachelor thesis.</p>\n\n<h2 id=\"goal\">Goal</h2>\n\n<h3 id=\"building-a-web-based-3d-composition-tool\">Building a web based 3D composition tool.</h3>\n\n<p>Build a web based 3D scene composition tool for the Project <code>Roundtrip3D</code> using current web technologies.\nThe Tool should provide following views and features</p>\n\n<ul>\n<li>A 3D View to visualize and edit 3D scenes in the X3DOM format</li>\n<li>A tree view to outline and edit 3D scenes in the X3DOM format</li>\n<li>A text view to edit JavaScript code</li>\n<li>A diagram view for SSIML (<code>Scene Structure and Integration Modelling Language</code>) models</li>\n<li>optional feature: launch transformation (transforming SSIML to X3DOM and JavaScript and the other way around) jobs on another machine running an eclipse instance</li>\n</ul>\n\n<p>Requirements: model driven software engineering, web development, JavaScript programming, 3D modeling</p>\n\n<h2 id=\"stack\">Stack</h2>\n\n<p>The stack used for building this is <a href=\"https://github.com/paulmillr/brunch-with-chaplin\">brunch with chaplin</a>.</p>\n\n<h3 id=\"brunch\">Brunch</h3>\n\n<blockquote>\n  <p><a href=\"http://brunch.io/\">Brunch</a> is an assembler for HTML5 applications. It‘s agnostic to frameworks, libraries, programming, stylesheet &amp; templating languages and backend technology.</p>\n</blockquote>\n\n<p>For this project <a href=\"http://coffeescript.org/\">CoffeeScript</a>, <a href=\"http://learnboost.github.com/stylus/\">Stylus</a> and <a href=\"http://handlebarsjs.com/\">Handlbars.js</a> are used.</p>\n\n<h3 id=\"chaplin\">Chaplin</h3>\n\n<blockquote>\n  <p><a href=\"http://documentcloud.github.com/backbone/\">Chaplin</a> is an architecture for JavaScript applications using the <a href=\"http://documentcloud.github.com/backbone/\">Backbone.js</a> library. The code is derived from <a href=\"http://moviepilot.com/\">moviepilot.com</a>, a large single-page application.</p>\n</blockquote>\n\n<h2 id=\"license\">License</h2>\n\n<p>The MIT license.</p>\n\n<p>Copyright (c) 2012 Danny Arnold (danny.arnold@student.tu-freiberg.de)</p>\n\n<p>Permission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies\nof the Software, and to permit persons to whom the Software is furnished to do\nso, subject to the following conditions:</p>\n\n<p>The above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.</p>\n\n<p>THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.</p>\n";});
}});

window.require.define({"views/templates/sidebar": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, stack2, stack3, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n  <div class=\"\">\n    <button id=\"btn_add\" class=\"sidebar-buttons\">Add</button>\n    <button id=\"btn_remove\" class=\"sidebar-buttons\">Remove</button>\n    <button id=\"btn_update\" class=\"sidebar-buttons\">Update</button>\n  </div>\n  <div id=\"sidebar-coords\" class=\"\">\n    <label for='x'>X:</label>\n    <input id=\"x\" class=\"sidebar-inputs\" type=\"text\" value='";
    foundHelper = helpers.selectedObject;
    stack1 = foundHelper || depth0.selectedObject;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.translation);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['x']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "selectedObject.translation.x", { hash: {} }); }
    buffer += escapeExpression(stack1) + "' /><br>\n    <label for='y'>Y:</label>\n    <input id=\"y\" class=\"sidebar-inputs\" type=\"text\" value='";
    foundHelper = helpers.selectedObject;
    stack1 = foundHelper || depth0.selectedObject;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.translation);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['y']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "selectedObject.translation.y", { hash: {} }); }
    buffer += escapeExpression(stack1) + "' /><br>\n    <label for='z'>Z:</label>\n    <input id=\"z\" class=\"sidebar-inputs\" type=\"text\" value='";
    foundHelper = helpers.selectedObject;
    stack1 = foundHelper || depth0.selectedObject;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.translation);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['z']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "selectedObject.translation.z", { hash: {} }); }
    buffer += escapeExpression(stack1) + "' /><br><br>\n  </div>\n  <div class='sidebar-sliders'>\n    <label for=\"trans_x\">X:</label>\n    <input type=\"text\" id=\"trans_x\" class=\"sidebar-inputs\" value='";
    foundHelper = helpers.selectedObject;
    stack1 = foundHelper || depth0.selectedObject;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.translation);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['x']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "selectedObject.translation.x", { hash: {} }); }
    buffer += escapeExpression(stack1) + "'/><br>\n    <label for=\"trans_y\">Y:</label>\n    <input type=\"text\" id=\"trans_y\" class=\"sidebar-inputs\" value='";
    foundHelper = helpers.selectedObject;
    stack1 = foundHelper || depth0.selectedObject;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.translation);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['y']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "selectedObject.translation.y", { hash: {} }); }
    buffer += escapeExpression(stack1) + "'/><br>\n    <label for=\"trans_z\">Z:</label>\n    <input type=\"text\" id=\"trans_z\" class=\"sidebar-inputs\" value='";
    foundHelper = helpers.selectedObject;
    stack1 = foundHelper || depth0.selectedObject;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.translation);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['z']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "selectedObject.translation.z", { hash: {} }); }
    buffer += escapeExpression(stack1) + "'/>\n  </div>\n";
    return buffer;}

  function program3(depth0,data) {
    
    
    return "\nWelcome to SceGraToo</br>\nChoose a View\n";}

    stack1 = "x3d-page";
    foundHelper = helpers.activeView;
    stack2 = foundHelper || depth0.activeView;
    foundHelper = helpers.match;
    stack3 = foundHelper || depth0.match;
    tmp1 = self.program(1, program1, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    if(foundHelper && typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
    else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n";
    stack1 = "home-page";
    foundHelper = helpers.activeView;
    stack2 = foundHelper || depth0.activeView;
    foundHelper = helpers.match;
    stack3 = foundHelper || depth0.match;
    tmp1 = self.program(3, program3, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    if(foundHelper && typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
    else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n";
    return buffer;});
}});

window.require.define({"views/templates/x3d": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<X3D class=\"x3d\" id=\"x3d\" xmlns=\"http://www.web3d.org/specifications/x3d-namespace\" debug=\"true\" showStat=\"false\" showLog=\"false\">\n  <Scene id=\"the_scene\" DEF=\"scene\">\n    <Viewpoint position=\"0 0 100\" orientation=\"0 0 0 1\"></Viewpoint>\n    <Group id=\"root\">\n      <!-- Dynamically added Stuff -->\n    </Group>\n  </Scene>\n</X3D>\n";});
}});

window.require.define({"views/x3d_page_view": function(exports, require, module) {
  var PageView, X3dPageView, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/x3d');

  PageView = require('views/base/page_view');

  module.exports = X3dPageView = (function(_super) {
    var currentObject;

    __extends(X3dPageView, _super);

    function X3dPageView() {
      this.select = __bind(this.select, this);

      this.updateObject = __bind(this.updateObject, this);

      this.removeObject = __bind(this.removeObject, this);

      this.addObject = __bind(this.addObject, this);
      return X3dPageView.__super__.constructor.apply(this, arguments);
    }

    X3dPageView.prototype.template = template;

    X3dPageView.prototype.className = 'x3d-page';

    X3dPageView.prototype.id = 'x3d-page';

    X3dPageView.prototype.offset = 0;

    currentObject = null;

    X3dPageView.prototype.initialize = function() {
      var _this = this;
      X3dPageView.__super__.initialize.apply(this, arguments);
      this.subscribeEvent('sidebar:btn_add:click', function(attributes) {
        return _this.addObject(attributes);
      });
      this.subscribeEvent('sidebar:btn_remove:click', function(attributes) {
        return _this.removeObject(attributes);
      });
      return this.subscribeEvent('sidebar:btn_update:click', function(attributes) {
        return _this.updateObject(attributes);
      });
    };

    X3dPageView.prototype.addObject = function(event) {
      var box, shape, transform;
      transform = document.createElement('Transform');
      shape = document.createElementWithCallback('Shape', this.select, "click");
      box = document.createElement('Box');
      transform.setAttribute('translation', "" + this.offset + " 0 0");
      shape.appendChild(box);
      transform.appendChild(shape);
      window.root.appendChild(transform);
      return this.offset += 3;
    };

    X3dPageView.prototype.removeObject = function(event) {
      var pa;
      if (this.currentObject) {
        pa = this.currentObject.parentElement;
        pa.removeChild(this.currentObject);
        return this.currentObject = null;
      }
    };

    X3dPageView.prototype.updateObject = function(attributes) {
      var translation;
      translation = this.currentObject.parentElement;
      return translation.setAttribute('translation', "" + attributes.selectedObject.translation.x + " " + attributes.selectedObject.translation.y + " " + attributes.selectedObject.translation.z);
    };

    document.createElementWithCallback = function(obj_name, callback, event_type) {
      var obj;
      obj = document.createElement(obj_name);
      obj.addEventListener(event_type, callback);
      console.log('addEventListener does not work');
      if (event_type === 'click') {
        obj.onclick = callback;
      }
      return obj;
    };

    X3dPageView.prototype.select = function(event) {
      this.currentObject = event.target;
      return this.publishEvent('x3d:object:select', this.currentObject);
    };

    return X3dPageView;

  })(PageView);
  
}});

