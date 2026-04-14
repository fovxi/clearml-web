import {ColHeaderFilterTypeEnum, ColHeaderTypeEnum, ISmCol} from '../shared/ui-components/data/table/table.consts';
import {MODELS_TABLE_COL_FIELDS} from './shared/models.const';
import {rootProjectsPageSize} from '@common/constants';
import {Link} from '~/features/experiments/experiments.consts';

export type ModelWizardMethodsEnum = 'create' | 'edit' | 'clone' | 'extend';
export const WIZARD_METHODS = {
  CREATE: 'create' as ModelWizardMethodsEnum,
  CLONE : 'clone' as ModelWizardMethodsEnum,
  EDIT  : 'edit' as ModelWizardMethodsEnum,
  EXTEND: 'extend' as ModelWizardMethodsEnum,
};

export type ModelsViewModesEnum = 'table' | 'tree';
export const MODELS_VIEW_MODES = {
  TABLE: 'table' as ModelsViewModesEnum,
  TREE : 'tree' as ModelsViewModesEnum,
};

export const MODELS_PAGE_SIZE = 30;
export const MODELS_STORE_KEY = 'models';

export const MODELS_PREFIX_INFO = 'MODELS_INFO_';
export const MODELS_PREFIX_MENU = 'MODELS_MENU_';
export const MODELS_PREFIX_VIEW = 'MODELS_';


export const STATUS = {
  PUBLISHED: '已发布',
  DRAFT    : '草稿'
};

export const MODELS_TABLE_COLS: ISmCol[] = [
  {
    id              : MODELS_TABLE_COL_FIELDS.SELECTED,
    headerType      : ColHeaderTypeEnum.checkBox,
    sortable        : false,
    filterable      : false,
    hidden          : false,
    header          : '',
    headerStyleClass: 'selected-col-header',
    style           : {width: '70px', maxWidth: '70px'},
    disableDrag     : true,
  },
  {
    id            : MODELS_TABLE_COL_FIELDS.ID,
    headerType    : ColHeaderTypeEnum.title,
    header        : '模型 ID',
    style         : {width: '100px'},
  },
  {
    id          : MODELS_TABLE_COL_FIELDS.FRAMEWORK,
    headerType  : ColHeaderTypeEnum.sortFilter,
    sortable    : true,
    filterable  : true,
    searchableFilter: true,
    header      : '框架',
    style       : {width: '100px'},
    showInCardFilters: true
  },
  {
    id          : MODELS_TABLE_COL_FIELDS.NAME,
    headerType  : ColHeaderTypeEnum.sortFilter,
    sortable    : true,
    header      : '名称',
    style       : {width: '300px'},
  },
  {
    id          : MODELS_TABLE_COL_FIELDS.TAGS,
    headerType  : ColHeaderTypeEnum.sortFilter,
    getter: ['tags', 'system_tags'],
    filterable  : true,
    sortable    : false,
    searchableFilter: true,
    header      : '标签',
    style       : {width: '240px'},
    excludeFilter: true,
    andFilter: true,
    columnExplain: '点击以包含该标签，再次点击可排除该标签。',
    showInCardFilters: true
  },
  {
    id          : MODELS_TABLE_COL_FIELDS.READY,
    headerType  : ColHeaderTypeEnum.sortFilter,
    sortable    : true,
    filterable  : true,
    header      : '状态',
    style       : {width: '135px'},
    showInCardFilters: true
  },
  {
    id          : MODELS_TABLE_COL_FIELDS.PROJECT,
    headerType  : ColHeaderTypeEnum.sortFilter,
    filterable  :  true,
    searchableFilter: true,
    sortable    : false,
    asyncFilter : true,
    paginatedFilterPageSize : rootProjectsPageSize,
    header      : '项目',
    style       : {width: '135px'}
  },
  {
    id              : MODELS_TABLE_COL_FIELDS.USER,
    getter          : 'user.name',
    headerType      : ColHeaderTypeEnum.sortFilter,
    searchableFilter: true,
    filterable      : true,
    sortable        : false,
    header          : '创建者',
    style           : {width: '240px'},
    showInCardFilters: true
  },
  {
    id        : MODELS_TABLE_COL_FIELDS.TASK,
    headerType: ColHeaderTypeEnum.title,
    sortable  : false,
    header    : '任务',
    style     : {width: '240px'}
  },
  {
    id        : MODELS_TABLE_COL_FIELDS.LAST_UPDATE,
    headerType  : ColHeaderTypeEnum.sortFilter,
    sortable  : true,
    filterType    : ColHeaderFilterTypeEnum.durationDate,
    filterable: true,
    searchableFilter: false,
    header      : '更新时间',
    label       : '更新时间',
    style       : {width: '150px'},
  },
  {
    id        : MODELS_TABLE_COL_FIELDS.COMMENT,
    headerType: ColHeaderTypeEnum.sortFilter,
    sortable  : true,
    header    : '描述',
    style     : {width: '240px'}
  },
];

export const  infoModelsTabsLinks = [
  {name: '概览', url: ['general']},
  {name: '网络', url: ['network']},
  {name: '标签', url: ['labels']},
  {name: '元数据', url: ['metadata']},
  {name: '血缘', url: ['tasks']},
  {name: '标量', url: ['scalars']},
  {name: '图表', url: ['plots']},
] as Link[];
