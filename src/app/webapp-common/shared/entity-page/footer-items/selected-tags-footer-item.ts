import {EntityTypeEnum} from '~/shared/constants/non-common-consts';
import {IFooterState, ItemFooterModel} from './footer-items.models';
import {MenuItems, selectionTags} from '../items.utils';

export class SelectedTagsFooterItem extends ItemFooterModel {

  constructor(
    public entitiesType: EntityTypeEnum,
  ) {
    super();
    this.id = MenuItems.tags;
    this.isTag = true;
    this.disableDescription = '标签';
  }

  getItemState(state: IFooterState<{id: string; tags: string[]}>) {
    const tags = state.data[this.id];
    return {
      disable: state.selectionAllHasExample,
      description: this.menuItemText.transform(tags?.selectedFiltered?.length, '添加标签'),
      disableDescription: '标签',
      emitValue: tags.selectedFiltered,
      tags: selectionTags(state.selected),
      companyTags: state.companyTags,
      projectTags: state.projectTags,
      tagsFilterByProject: state.tagsFilterByProject
    };
  }
}
