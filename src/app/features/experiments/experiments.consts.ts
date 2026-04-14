import {EXPERIMENT_INFO_ONLY_FIELDS_BASE} from '@common/experiments/experiment.consts';
import {DATASETS_STATUS_LABEL, EXPERIMENTS_STATUS_LABELS} from '~/features/experiments/shared/experiments.const';
import {TaskStatusEnum} from '~/business-logic/model/tasks/taskStatusEnum';
export {INITIAL_EXPERIMENT_TABLE_COLS} from '../../webapp-common/experiments/experiment.consts';

export const GET_ALL_QUERY_ANY_FIELDS = ['id', 'name', 'comment', 'system_tags', 'models.output.model', 'models.input.model'];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getExperimentInfoOnlyFields = (hasDataFeature: boolean) => EXPERIMENT_INFO_ONLY_FIELDS_BASE;

export interface Link {
  name: string;
  url: string[];
  activeBy?: string;
}

export const infoTabLinks = [
  {name: '执行', url: ['execution']},
  {name: '配置', url: ['hyper-params', 'hyper-param', '_empty_'], activeBy: 'hyper-params'},
  {name: '工件', url: ['artifacts']},
  {name: '信息', url: ['general']},
  {name: '控制台', url: ['log'], output: true},
  {name: '标量', url: ['scalars'], output: true},
  {name: '图表', url: ['plots'], output: true},
  {name: '调试样本', url: ['debugImages'], output: true}
];

export const FILTERED_EXPERIMENTS_STATUS_OPTIONS = (isDataset) => Object.entries(EXPERIMENTS_STATUS_LABELS)
  .filter(([key]: [TaskStatusEnum, string]) => key !== TaskStatusEnum.Closed)
  .map(([key, val]) => ({label: isDataset && DATASETS_STATUS_LABEL[key] || val, value: key}));
