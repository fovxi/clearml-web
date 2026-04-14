import {EntityTypeEnum, ENTITY_TYPE_LABELS} from '~/shared/constants/non-common-consts';
import {IFooterState, ItemFooterModel} from './footer-items.models';
import {MenuItems} from '../items.utils';

export class ShowItemsFooterSelected extends ItemFooterModel {

  constructor(public entitiesType: EntityTypeEnum) {
    super();
    this.id = MenuItems.showAllItems;
    this.emit = true;
    this.class = 'show-all';

  }

  getItemState(state: IFooterState<{id: string}>) {
    const entityLabel = ENTITY_TYPE_LABELS[this.entitiesType] || this.entitiesType;
    return {
      title: state.showAllSelectedIsActive ?
        `显示全部${entityLabel}` :
        `显示已选中的${state.selected.length}个${entityLabel}`,
      emitValue: state.showAllSelectedIsActive,
      preventCurrentItem: false
    };
  }
}
