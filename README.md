[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/xtal-props)
# \<xtal-props\>

## View / Edit a Polymer web component.  Debug polymer web components.

\<xtal-props\> solves a number of use cases:

* Rapid prototyping via Property Editor.  Often we define a nice model for an object, and we want to start testing the model right away, without devoting time to building the UI.  Or we want to rapidly build a number of admin screens, and don't want to *ever* devote much tender loving care to building and maintaining highly customized forms to edit the objects.  This component will automatically generate a UI based on the Polymer properties definition.
*  Debugging.  Be able to quickly inspect a custom element and see / modify the custom properties associated with it. 

## Syntax for debugging

To allow opening the property editor on ctrl+click, add the following markup:

```html
<xtal-props debug></xtal-props>
```

## Some additional comments on debugging

Rob Dodson pointed out at the last Polymer summit that reflecting primitive (string, boolean, numeric) properties to attributes (and vice versa), makes debugging much easier (especially for Chrome, where attribute changes flash as they change).  I agree.

There is also now a wonderful [Polymer Inspector Chrome Extension[(https://chrome.google.com/webstore/detail/polyspector/naoehbibkfilaolkmfiehggkfjndlhpd?hl=en).

Unfortunately, this won't help with the worst case browser scneario:  IE11 / Edge.

With these browsers, inspecting an element just produces a white, blank tree.

I recommend trying out [https://github.com/bahrus/xtal-shell]($hell.js) to help with those browser, from yours truly.  Feedback welcome.

## Syntax for auto generating a UI 

When defining a Polymer custom element (say "my-component"),  just create the static properties, and place the following inside the template:

```html
<dom-module id="my-component">
  <template>
    <xtal-props></xtal-props>
  </template>
</dom-module>
```

and add the following ready method:

```JavaScript
ready() {
  super.ready();
  //this.$.myProps.name = 'my-component';
  const xtalProps = this.shadowRoot.querySelector('xtal-props');
  xtalProps.observe = this;
}
```

### List of features:

- [ ] Auto generate an interface based on the static polymer properties.
  - [x] Readonly support for string, boolean, number properties (Polymer components only).
  - [x] Readonly support nested child object properties.
  - [x] Readonly support for array properties.
  - [x] Edit support for string property.
  - [x] Edit support for  boolean property., 
  - [x] Edit support for number property.
  - [x] Edit support nested child object properties.
  - [ ] Edit support for array properties.
- [ ] Provide similar support for other custom element libraries.
- [ ] Debug support:
  - [x] Open up an object editor / viewer after ctrl-clicking on a custom element.
  - [x] ctrl-clicking (command-click on a Mac) on a custom element logs the constructor to the console, allowing quick navigation to the function definition.
  - [ ] ctrl-clicking on a custom element copies the css path to the clipboard, which allows adding conditional breakpoints.
  - [x] Readonly support for string, boolean, number properties (Polymer components only).
  - [x] Readonly support nested child object properties.
  - [x] Readonly support for array properties.
  - [x] Edit support for string property.
  - [x] Edit support for boolean property. 
  - [x] Edit support for number property.
  - [x] Edit support nested child object properties.
  - [ ] Edit support for array properties.
  - [ ] Support closing debug panel

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
