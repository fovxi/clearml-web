import {EntityTypeEnum, ENTITY_TYPE_LABELS} from '~/shared/constants/non-common-consts';
import {IconNames, ICONS} from '@common/constants';
import {ItemFooterModel, IFooterState} from './footer-items.models';
import {MenuItems} from '../items.utils';

export class ArchiveFooterItem extends ItemFooterModel {
  override id = MenuItems.archive;

  constructor(public entitiesType: EntityTypeEnum) {
    super();
  }

  getItemState(state: IFooterState<{id: string}>): { icon?: IconNames; title?: string; description?: string; disable?: boolean; disableDescription?: string; emit?: boolean; emitValue?: boolean; preventCurrentItem?: boolean; class?: string; wrapperClass?: string } {
      const archive = state.data[this.id];
      const icon = (state.selectionAllIsArchive ? ICONS.RESTORE : ICONS.ARCHIVE) as Partial<IconNames>;
      const name = icon === ICONS.RESTORE ? '恢复' : '归档';
      const entityLabel = ENTITY_TYPE_LABELS[this.entitiesType] || this.entitiesType;

      return {
        description: this.menuItemText.transform(archive?.available, icon === ICONS.RESTORE ? '从归档中恢复' : '归档'),
        icon,
        disable: archive?.disable,
        disableDescription: state.selectionIsOnlyExamples ? name : `仅可${name}自己拥有的${entityLabel}`
      };
  }
}
