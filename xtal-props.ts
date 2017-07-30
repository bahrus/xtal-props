module xtal.elements {
    interface PropType {
        name: string,
        val: any,
        type: string
    }
    interface IXtalPropsProperties {
        debug: boolean | polymer.PropObjectType,
        name: string | polymer.PropObjectType,
        watch: any | polymer.PropObjectType,
        polymerProps: { [key: string]: polymer.PropObjectType } | polymer.PropObjectType
        bindableProps: PropType[] | polymer.PropObjectType,
    }

    function initXtalProps() {
        if (customElements.get('xtal-props')) return;
        /**
        * `xtal-props`
        * Polymer based object viewer / editor. 
        * 
        *
        * @customElement
        * @polymer
        * @demo demo/index.html
        */
        class XtalProps extends Polymer.Element implements IXtalPropsProperties {
            debug: boolean; watch: any; bindableProps: PropType[]; name: string; polymerProps: { [key: string]: polymer.PropObjectType };
            static get is() { return 'xtal-props'; }
            static get properties(): IXtalPropsProperties {
                return {
                    debug: {
                        type: Boolean,
                        observer: 'onEnableDebugging'
                    },
                    /**
                    * The expression that points to an object to edit.
                    */
                    watch: {
                        type: Object,
                        observer: 'onPropsChange'
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
                    }
                }
            }
            onPropsChange() {
                if(!this.polymerProps || !this.watch) return;
                const primitiveCEProps = [];
                for(const key in this.polymerProps){
                    const polyProp = this.polymerProps[key];
                    const newProp = {
                        name: key,
                        val: this.watch[key],
                        type: polyProp.type.name,
                    }
                    console.log(newProp);
                    primitiveCEProps.push(newProp);
                }
                this.bindableProps = primitiveCEProps;
            }
            displayDebugView(e: Event, CE_ProtoType) {
                this.style.display = 'block';
                //const objToEdit = {};
                //const ownProps = Object.getOwnPropertyNames(e.srcElement);
                // ownProps.forEach(name => {
                //     if(name.startsWith('_')) return;
                //     if(this.namesToBlock.indexOf(name) !==-1 ) return;
                //     objToEdit[name] = e.srcElement[name];
                // });
                const polyProps = CE_ProtoType.properties as { [key: string]: polymer.PropObjectType };
                const ce = e.srcElement;
                this.watch = ce;
                this.polymerProps = polyProps;


                // if(CE)
                // console.log(objToEdit);
                // this.watch = objToEdit;
            }
            onEnableDebugging() {
                if (this.debug) {
                    this.style.display = 'none';
                    const _this = this;
                    document.body.addEventListener('click', e => {
                        if (e.ctrlKey) {
                            const tn = e.srcElement.tagName.toLowerCase();

                            if (tn.indexOf('-') > -1) {
                                const CE_ProtoType = customElements.get(tn);
                                if (CE_ProtoType) {
                                    console.log('enableDebug');
                                    this.name = tn;
                                    _this.displayDebugView(e, CE_ProtoType);
                                }
                            }
                        }

                    })
                }
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
}