import {ItemFooterModel, IFooterState} from './footer-items.models';
import {TaskStatusEnum} from '~/business-logic/model/tasks/taskStatusEnum';
import {MenuItems} from '../items.utils';
import {EntityTypeEnum, ENTITY_TYPE_LABELS} from '~/shared/constants/non-common-consts';
import {IconNames, ICONS} from '@common/constants';

export class ResetFooterItem<T extends {status: TaskStatusEnum}> extends ItemFooterModel {

  constructor(public entitiesType: EntityTypeEnum) {
    super();
    this.id = MenuItems.reset;
    this.emit = true;
    this.icon = ICONS.RESET as Partial<IconNames>;
  }

  getItemState(state: IFooterState<{id: string}>): { icon?: IconNames; title?: string; description?: string; disable?: boolean; disableDescription?: string; emit?: boolean; emitValue?: boolean; preventCurrentItem?: boolean; class?: string; wrapperClass?: string } {
    const entityLabel = ENTITY_TYPE_LABELS[this.entitiesType] || this.entitiesType;
    return {
      disable: state.data[this.id]?.disable,
      description: this.menuItemText.transform(state.data[this.id]?.available, '重置'),
      disableDescription: state.selectionIsOnlyExamples ? '重置' : `仅可重置非草稿、非已发布的${entityLabel}`
    };
  }
}
