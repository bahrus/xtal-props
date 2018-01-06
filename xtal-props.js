var xtal;
(function (xtal) {
    var elements;
    (function (elements) {
        function initXtalProps() {
            if (customElements.get('xtal-props'))
                return;
            /**
            * `xtal-props`
            * Polymer based object viewer / editor.
            *
            *
            * @customElement
            * @polymer
            * @demo demo/index.html
            */
            class XtalProps extends Polymer.Element {
                static get is() { return 'xtal-props'; }
                static get properties() {
                    return {
                        debug: {
                            type: Boolean,
                            observer: 'onEnableDebugging'
                        },
                        /**
                        * The expression that points to an object to edit.
                        */
                        observe: {
                            type: Object,
                            observer: 'onPropsChange'
                        },
                        expanded: {
                            type: Boolean,
                            notify: true
                        },
                        polymerProps: {
                            type: Object,
                            observer: 'onPropsChange'
                        },
                        bindableProps: {
                            type: Array,
                        },
                        name: {
                            type: String
                        },
                        expandText: {
                            type: String,
                            observer: 'onSetExpandText'
                        }
                    };
                }
                onSetExpandText() {
                    if (this.expandText) {
                        this.$.legend.style.cursor = 'pointer';
                    }
                }
                onPropsChange() {
                    if (!this.polymerProps || !this.observe)
                        return;
                    const bindableProps = [];
                    for (const key in this.polymerProps) {
                        const polyProp = this.polymerProps[key];
                        const newProp = {
                            name: key,
                            val: this.observe[key],
                            type: polyProp.type.name,
                            expandText: polyProp.expandText,
                            label: polyProp.label || key,
                            _properties: polyProp._properties,
                        };
                        //console.log(newProp);
                        bindableProps.push(newProp);
                    }
                    this.bindableProps = bindableProps;
                }
                displayDebugView(e, CE_ProtoType) {
                    this.style.display = 'block';
                    const polyProps = CE_ProtoType.properties;
                    const ce = e.srcElement;
                    this.observe = ce;
                    this.polymerProps = polyProps;
                }
                onEnableDebugging() {
                    if (this.debug) {
                        this.style.display = 'none';
                        const _this = this;
                        document.body.addEventListener('click', e => {
                            if (e.ctrlKey || e.metaKey) {
                                const tn = e.srcElement.tagName.toLowerCase();
                                if (tn.indexOf('-') > -1) {
                                    const CE_ProtoType = customElements.get(tn);
                                    console.log(CE_ProtoType);
                                    if (CE_ProtoType) {
                                        this.name = tn;
                                        _this.displayDebugView(e, CE_ProtoType);
                                    }
                                }
                            }
                        });
                    }
                }
                close() {
                    this.style.display = 'none';
                }
                updateInput(e) {
                    const item = e.srcElement['item'];
                    this.observe[item.name] = e.srcElement['value'];
                    //debugger;
                }
                updateBoolean(e) {
                    const item = e.srcElement['item'];
                    this.observe[item.name] = e.srcElement['checked'];
                    //debugger;
                }
                // updateNumber(e: Event){
                //     debugger;
                // }
                toggleNextElement(e) {
                    e.stopPropagation();
                    const srcEl = e.srcElement;
                    const nextSibling = srcEl.nextElementSibling;
                    if (nextSibling.style.display !== 'none') {
                        nextSibling['_originalStyleDisplay'] = nextSibling.style.display;
                        nextSibling.style.display = 'none';
                    }
                    else {
                        if (nextSibling['_originalStyleDisplay']) {
                            nextSibling.style.display = nextSibling['_originalStyleDisplay'];
                        }
                        else {
                            nextSibling.style.display = 'block';
                        }
                    }
                }
                toggleView() {
                    this.expanded = !this.expanded;
                }
                childToggled(e) {
                    const srcEl = e.srcElement || e.target;
                    const childPropsEditor = srcEl;
                    const item = e['model'].item;
                    const polymerProps = this.polymerProps[item.name];
                    if (polymerProps['_isExpanded']) {
                        childPropsEditor.bindableProps = null;
                        childPropsEditor.observe = null;
                        polymerProps['_isExpanded'] = false;
                    }
                    else {
                        childPropsEditor.observe = item.val;
                        polymerProps['_isExpanded'] = true;
                    }
                    childPropsEditor.polymerProps = polymerProps['_properties'];
                }
            }
            customElements.define(XtalProps.is, XtalProps);
        }
        const testSyncKey = 'xtal_elements_props';
        if (window[testSyncKey]) {
            initXtalProps();
            delete window[testSyncKey];
        }
        else {
            customElements.whenDefined('poly-prep').then(() => {
                initXtalProps();
            });
            customElements.whenDefined('full-poly-prep').then(() => {
                initXtalProps();
            });
        }
        initXtalProps();
    })(elements = xtal.elements || (xtal.elements = {}));
})(xtal || (xtal = {}));
//# sourceMappingURL=xtal-props.js.map