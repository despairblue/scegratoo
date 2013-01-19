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
The MIT license.

Copyright (c) 2012 Danny Arnold (danny.arnold@student.tu-freiberg.de)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
