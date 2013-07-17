# SceGraToo

This Project is part of my bachelor thesis.

## Goal

### Building a web based 3D composition tool.

Build a web based 3D scene composition tool for the Project `Roundtrip3D` using current web technologies.
The Tool should provide following views and features
- A 3D View to visualize and edit 3D scenes in the X3DOM format
- A tree view to outline and edit 3D scenes in the X3DOM format
- A text view to edit JavaScript code
- A diagram view for SSIML (`Scene Structure and Integration Modelling Language`) models
- optional feature: launch transformation (transforming SSIML to X3DOM and JavaScript and the other way around) jobs on another machine running an eclipse instance

Requirements: model driven software engineering, web development, JavaScript programming, 3D modeling

## Stack
The stack used for building this is [brunch with chaplin](https://github.com/paulmillr/brunch-with-chaplin).

### Brunch
> [Brunch](http://brunch.io/) is an assembler for HTML5 applications. It‘s agnostic to frameworks, libraries, programming, stylesheet & templating languages and backend technology.

For this project [CoffeeScript](http://coffeescript.org/), [Stylus](http://learnboost.github.com/stylus/) and [Handlbars.js](http://handlebarsjs.com/) are used.

### Chaplin
> [Chaplin](http://documentcloud.github.com/backbone/) is an architecture for JavaScript applications using the [Backbone.js](http://documentcloud.github.com/backbone/) library. The code is derived from [moviepilot.com](http://moviepilot.com/), a large single-page application.

## Hooks
Link the `hooks` dir to `.git/hooks`.
> `cd .git`

> `ln -s ../hooks .`

## License
Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

