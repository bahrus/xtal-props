[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/xtal-props)
# \<xtal-props\>

## Scaffold a UI from property configurations

The .net native windows (?) component called ["PropertyGrid"](https://www.c-sharpcorner.com/uploadfile/witnes/using-propertygrid-in-net/) allows developers to create POCO's (plain old C# objects) that represent the business functionality, then pass instances of that class to the PropertyGrid component via the selectedObject property.

This allows Microsoft and others to quickly build native apps, like admin screens, where the target audience is technical folks who are comfortable editing data using what is basically a glorified object editor.  This allows for rapid development of powerful OS enhancements.

In fact, Microsoft also uses the same component for debugging purposes.

This component is designed to harness some of the same use cases as the PropertyGrid.

The way developers can customize how the PropertyGrid treats properties is via .net attributes, which are quite similar (but less dynamic, more declarative) to the decorator proposal.

Examples of customizations are:

1.  Providing a description for the property.
2.  Grouping properties into categories.
3.  Specifying custom editors for individual properties.

However, the decorator proposal has been sitting in limbo for quite some time, thus requiring a proprietary compiling tool of some sort.

This component would probably switch to the decorator approach should that ever become standardized into EcmaScript.

For now, this component will use a separate JSON-like configuration object.

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



