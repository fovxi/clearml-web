import {IFooterState, ItemFooterModel} from './footer-items.models';
import {IconNames, ICONS} from '@common/constants';
import {MenuItems, selectionDisabledAbortAllChildren} from '../items.utils';

export class AbortAllChildrenFooterItem extends ItemFooterModel {

  constructor() {
    super();
    this.id = MenuItems.abortAllChildren;
    this.emit = true;
    this.icon = ICONS.STOPPED_ALL as Partial<IconNames>;
  }

  getItemState(state: IFooterState<{id: string}>): { icon?: IconNames; title?: string; description?: string; disable?: boolean; disableDescription?: string; emit?: boolean; emitValue?: boolean; preventCurrentItem?: boolean; class?: string; wrapperClass?: string } {
    const {available, disable} = selectionDisabledAbortAllChildren(state.selected);
    return {
      disable,
      description: `中止全部子项（${available}项）`,
      disableDescription: state.selectionIsOnlyExamples ? '中止全部子项' : '仅可中止类型为“控制器”或“优化器”的任务子项'
    };
  }

}
