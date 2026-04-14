import {ItemFooterModel, IFooterState} from './footer-items.models';
import {IconNames, ICONS} from '@common/constants';
import {MenuItems, selectionDisabledAbort} from '../items.utils';
import {EntityTypeEnum, ENTITY_TYPE_LABELS} from '~/shared/constants/non-common-consts';

export class AbortFooterItem extends ItemFooterModel {

  constructor(public entitiesType: EntityTypeEnum) {
    super();
    this.id = MenuItems.abort;
    this.emit = true;
    this.icon = ICONS.STOPPED as Partial<IconNames>;
  }
  getItemState(state: IFooterState<{id: string}>) {
    const {available, disable} = selectionDisabledAbort(state.selected);
    const entityLabel = ENTITY_TYPE_LABELS[this.entitiesType] || this.entitiesType;
    return {
      disable,
      description: `中止（${available}项）`,
      disableDescription: state.selectionIsOnlyExamples ? '中止' : `仅可中止状态为“运行中”的${entityLabel}`
    };
  }
}
