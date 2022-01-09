[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/xtal-props)
# \<xtal-props\>

## Scaffold a UI from property configurations

The .net native windows (?) component ["PropertyGrid"](https://www.c-sharpcorner.com/uploadfile/witnes/using-propertygrid-in-net/) allows developers to create POCO's (plain old C# objects) that represent the business functionality, then pass instances of that class to the PropertyGrid component via the selectedObject property.

This allows Microsoft and others to quickly build native apps, like admin screens, where the target audience is technical folks who are comfortable editing data using what is basically a glorified object editor.  This allows for rapid development of powerful OS enhancements.

In fact, Microsoft also uses the same component for debugging purposes within Visual Studio.

This component is designed to harness some of the same use cases as the PropertyGrid.

The way .net developers can customize how the PropertyGrid treats properties is via .net attributes, which are quite similar (but less dynamic, more declarative) to the decorator proposal.

Examples of customizations are:

1.  Providing a description for the property.
2.  Grouping properties into categories.
3.  Specifying custom editors for individual properties.

However, the decorator proposal has been sitting in limbo for quite some time, thus requiring a proprietary compiling tool of some sort.

This component would probably switch to the decorator approach should that ever become standardized into EcmaScript.

For now, this component will use separate JSON-like configuration settings.

For example, suppose we define a JS class:

```JavaScript
export class MyAdminScreen {
  enlargeText: boolean;
  everythingBigger: boolean;
  everythingBrighter: boolean;
  pointerSize: number;
  touchFeedback: boolean;
}
```

We want to indicate that the first three properties should be grouped under "Display" and the last two under "Mouse pointer" category.

We can do that with expressions such as:

```JavaScript

const boolType: XtalProp = {
  type: Boolean,
};
const displayCategory: XtalProp = {
  category: 'Display'
};
const mousePointerCategory: XtalProp = {
  category: 'Mouse pointer'
};
const boolDisplayCategory: XtalProp = {
  ...boolType,
  ...displayCategory
};
const propConfig: XtalPropsConfig<MyAdminScreen> = {
  enlargeText: boolDisplayCategory
  everythingBigger: boolDisplayCategory
  everythingBrighter: boolDisplayCategory
  pointerSize: {
    type: Number,
    ...mousePointerCategory
  },
  touchFeedback: {
    ...boolType,
    ...mousePointerCategory
  }
};
myXtalPropsInstance.config = propConfig;
myXtalPropsInstance.selectedObject = myAdminScreenInstance;
```

This can also be defined declaratively:

```html
<xtal-props selected-object='{
  "enlargeText": true,
  "everythingBigger": true,
}'
  config='{
  "enlargeText": {
    "type": "boolean",
    "category": "Display"
  },
  "everythingBigger": {
    "type": "boolean",
    "category": "Display"
  },
  "pointerSize": {
    "type": "number",
    "category": "Mouse pointer"
  },
  "touchFeedback": {
    "type": "boolean",
    "category": "Mouse pointer"
  }
}'></xtal-props>
>
</xtal-props>
```

If there are multiple instances of this component, each instance can have its own configuration, but it would often be the case that they would all have the same settings.

We can set those common settings in bulk using [be-hydrating](https://github.com/bahrus/be-hydrating)

An alternative, less dynamic approach would be to subclass xtal-props for specific use cases, and set the default configuration in the constructor.

### List of features:

- [ ] Auto generate an interface based on prop config definitions.
  - [] Readonly support for string, boolean, number properties.
  - [] Support multiple design libraries via import maps.
  - [] Readonly support nested child object properties.
  - [] Readonly support for array properties.
  - [] Edit support for string property.
  - [] Edit support for  boolean property., 
  - [] Edit support for number property.
  - [] Edit support nested child object properties.
  - [ ] Edit support for array properties.


### Implementation Ramblings

```html
<template id=num-field>
  <label>{{description}}</label>
  <input type=number>
</template>

<template id=enum-field>
</template>

<template id=categoryHolder>
  <fieldset>
    <legend>{{myLegend}}</legend>
  </fieldset>
  <li-bid list='[{"templort":"num-field"}]'>

  </li-bid>
</template>
```

```html
<li-bid template-id=categoryHolder list='[{"myLegend": "Legend 1."}]'>
  
</li-bid>
```
