import {HeaderNavbarTabConfig} from '@common/layout/header-navbar-tabs/header-navbar-tabs-config.types';
import {MetricVariantResult} from '~/business-logic/model/projects/metricVariantResult';

export type MetricValueType = 'min_value' | 'max_value' | 'value';

export interface SelectedMetric {
  name: string;
  path: string;
  valueType?: 'min_value' | 'max_value' | 'value';
}

export interface SelectedMetricVariant extends MetricVariantResult{
  valueType?: 'min_value' | 'max_value' | 'value';
}

export interface DataDictionary {
  dataDictionary: boolean;
  link: string;
  dataValue: string;
}

export const RENAME_MAP = {
  'network_design': '网络结构',
  'uncommitted_changes': '未提交变更',
  'installed_packages': 'Python 包',
  'setup_shell_script': '初始化 Shell 脚本',
  ' input models': '输入模型',
  ' output models': '输出模型',
  'model': '模型',
  'source': '源码',
  ' default': '默认',
  'augmentation': '增强',
  'filtering': '过滤',
  'iteration': '迭代',
  'labels_enumeration': '标签枚举',
  'mapping': '映射',
  'view': '视图',
  '_legacy': '通用',
  'container': '容器'
};

export const MAX_ROWS_FOR_SMART_COMPARE_ARRAYS = 20000;
export const COMPARE_DETAILS_ONLY_FIELDS_BASE = [
  'id',
  'name',
  'type',
  'status',
  'last_update',
  'project.name',
  'models.input.name',
  'models.output.name',
  'models.output.model.name',
  'models.output.model.uri',
  'models.output.model.framework',
  'models.output.model.design',
  'models.input.name',
  'models.input.model.name',
  'models.input.model.uri',
  'models.input.model.framework',
  'models.input.model.labels',
  'models.input.model.design',
  'execution.artifacts',
  'container',
  'script',
  'tags',
  'system_tags',
  'published',
  'last_iteration',
  'configuration',
  'last_change',
  'completed',
  'created',
  'user.name',
  'parent.name',
  'execution.queue.name',
  'execution.queue.display_name',
  'active_duration',
  'started',
  'status_message',
  'status_reason',
  'last_worker',
  'runtime'
];

export const COMPARE_DEBUG_IMAGES_ONLY_FIELDS = [
  'id',
  'name',
  'type',
  'status',
  'last_update',
  'project.name',
  'tags',
  'published',
  'last_iteration',
];

export const LIMITED_VIEW_LIMIT = 10;

export const EXPERIMENTS_COMPARE_ROUTES = [
  {header: 'details'},
  {header: 'hyperparameters', featureName: 'hyper-params', featureLink: 'hyper-params'},
  {header: 'scalars'},
  {header: 'plots', featureName: 'metrics-plots', featureLink: 'metrics-plots'},
  {header: 'debug samples', featureName: 'debug-images', featureLink: 'debug-images'},
] as HeaderNavbarTabConfig[];


export const MODELS_COMPARE_ROUTES = [
  {header: 'details', featureName: 'models-details', featureLink: 'models-details'},
  {header: 'network'},
  {header: 'scalars'},
  {header: 'plots', featureName: 'metrics-plots', featureLink: 'metrics-plots'},
] as HeaderNavbarTabConfig[];

export const HIDDEN_PLOTS_BY_DEFAULT = ['Pipeline - Execution Flow', 'Pipeline Details - Execution Details'];
