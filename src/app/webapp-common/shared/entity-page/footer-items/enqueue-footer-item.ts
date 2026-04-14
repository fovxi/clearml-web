import {ItemFooterModel, IFooterState} from './footer-items.models';
import {IconNames, ICONS} from '@common/constants';
import {MenuItems} from '../items.utils';

export class EnqueueFooterItem extends ItemFooterModel {

  constructor() {
    super();
    this.id = MenuItems.enqueue;
    this.emit = true;
    this.icon = ICONS.ENQUEUE as Partial<IconNames>;
  }

  getItemState(state: IFooterState<{id: string}>): { icon?: IconNames; title?: string; description?: string; disable?: boolean; disableDescription?: string; emit?: boolean; emitValue?: boolean; preventCurrentItem?: boolean; class?: string; wrapperClass?: string } {
    const enqueue = state.data[this.id];

    return {
      disable: enqueue?.disable,
      preventCurrentItem: state.selectionAllIsArchive,
      description: this.menuItemText.transform(enqueue?.available, '入队'),
      disableDescription: state.selectionIsOnlyExamples ? '入队' : '仅可将状态为“草稿”或“已中止”的任务加入队列'

    };
  }
}
