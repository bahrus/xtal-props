[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/if-diff)
# \<xtal-props\>

View / Edit an object.  Debug web components

\<xtal-props\> solves a number of use cases:

* Rapid prototyping via Property Editor.  Often we define a nice model for an object, and we want to start testing the model right away, without devoting time to building the UI.  Or we want to rapidly build a number of admin screens, and don't want to *ever* devote much tender loving care to building and maintaining highly customized forms to edit the objects.  This component will automatically generate a UI based on the Polymer properties definition.
*  Chrome's debugging support for custom elements could be greatly improved.  In particular, being able to quickly inspect a custom element and see / modify the custom properties associated with it, is not (yet?) available on Chrome.  Debugging on browsers, like IE11 ,that don't natively support custom elements is considerably worse.  This component helps debugging in those environments.

### List of features:

- [ ] Auto generate an interface based on the static polymer properties.
- [ ] Provide similar support for other custom element libraries.
- [x] Open up an object editor / viewer after ctrl-clicking on a custom element.
- [x] Readonly support for string, boolean, number properties (Polymer components only).
- [ ] Readonly support nested child object properties.
- [ ] Readonly support for array properties.
- []  Edit support for string, boolean, number properties.
- [ ] Edit support nested child object properties.
- [ ] Edit support for array properties.

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
