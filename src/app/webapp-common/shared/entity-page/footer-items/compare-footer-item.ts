import {IconNames, ICONS} from '@common/constants';
import {EntityTypeEnum, ENTITY_TYPE_LABELS} from '~/shared/constants/non-common-consts';
import {MenuItems} from '../items.utils';
import { ItemFooterModel} from './footer-items.models';
export const compareLimitations = 100;
export class CompareFooterItem extends ItemFooterModel  {
  override id = MenuItems.compare;
  override icon = ICONS.COMPARE as Partial<IconNames>;
  override class = 'compare';
  override title = '对比';
  override emit = true;

  constructor(public entitiesType: EntityTypeEnum) {
    super();
    const entityLabel = ENTITY_TYPE_LABELS[this.entitiesType] || this.entitiesType;
    this.disableDescription = `最多只能对比 ${compareLimitations} 个${entityLabel}`;
  }
  getItemState(state) {
    return {
      disable: state.selected.length > compareLimitations || state.selected?.length <2,
    };

  }
}
