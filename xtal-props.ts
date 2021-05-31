import {xc, ReactiveSurface, IReactor, PropAction, PropDef, PropDefMap} from 'xtal-element/lib/XtalCore.js';
import {XtalProp} from './types.d.js';

export class XtalProps<ObjectType = Object> extends HTMLElement implements ReactiveSurface{
    static is = 'xtal-props';
    self = this;
    propActions = propActions;
    reactor: IReactor = new xc.Rx(this);
    selectedObject: any;
    uiConfig: XtalProp<ObjectType>[] | undefined;
    uiConfigByCategory: {[key: string]: XtalProp<ObjectType>[]} | undefined;
}
const linkUIConfigByCategory = ({uiConfig, self}: XtalProps) => {
    const uiConfigByCategory: {[key: string]: XtalProp<any>[]} = {
        Miscellaneous: []
    };
    for(const propConfig of uiConfig!){
        const category = propConfig.category || 'Miscellaneous';
        if(uiConfigByCategory[category] === undefined){
            uiConfigByCategory[category] = [];
        }
        uiConfigByCategory[category].push(propConfig);
    }
    self.uiConfigByCategory = uiConfigByCategory;
}
const propActions = [linkUIConfigByCategory] as PropAction[];
const baseObjProp: PropDef = {
    dry: true,
    async: true,
    stopReactionsIfFalsy: true,
};
const propDefMap: PropDefMap<XtalProps> = {
    selectedObject: baseObjProp,
    uiConfig: baseObjProp,
    uiConfigByCategory: baseObjProp,
};
xc.define(XtalProps);