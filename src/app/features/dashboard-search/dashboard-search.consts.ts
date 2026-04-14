import {TaskStatusEnum} from '~/business-logic/model/tasks/taskStatusEnum';
import {TaskTypeEnum} from '~/business-logic/model/tasks/taskTypeEnum';
import {EXPERIMENTS_TYPE_LABELS} from '~/shared/constants/non-common-consts';
import {DATASETS_STATUS_LABEL} from '~/features/experiments/shared/experiments.const';

export type ActiveSearchLink = 'projects' | 'experiments' | 'models' | 'pipelines' | 'datasets' | 'modelEndpoints';

export const activeSearchLink = {
  projects: 'projects' as ActiveSearchLink,
  experiments: 'tasks' as ActiveSearchLink,
  models: 'models' as ActiveSearchLink,
  pipelines: 'pipelines' as ActiveSearchLink,
  pipelineRuns: 'pipelineRuns' as ActiveSearchLink,
  datasets: 'datasets' as ActiveSearchLink,
  openDatasetVersions: 'openDatasetVersions' as ActiveSearchLink,
  reports: 'reports' as ActiveSearchLink,
  modelEndpoints: 'modelEndpoints' as ActiveSearchLink,
  loadingEndpoints: 'loadingEndpoints' as ActiveSearchLink,
};

export const SearchTabsWithTable = [activeSearchLink.models, activeSearchLink.experiments];

export const TaskStatusOptions = Object.values(TaskStatusEnum).filter(key=> !['unknown', 'publishing','closed'].includes(key));
export const TaskTypeOptions = Object.values(TaskTypeEnum).filter(key=> !['dataset_import', 'annotation','annotation_manual'].includes(key));

export interface SearchPageConfig {
  name: ActiveSearchLink;
  title?: string;
  viewAllResults: boolean;
  loadMore?: boolean;
  viewAllResultsLink?: string
}

export const activeLinksList = [
  {
    label: '项目',
    showUserFilter: true,
    name: activeSearchLink.projects,
    statusOptions: [],
    relevantSearchItems:{
      [activeSearchLink.projects]:{name: activeSearchLink.projects, viewAllResults: true, viewAllResultsLink: 'projects',  title: '项目'}}
  },
  {
    label: '数据集',
    showUserFilter: true,
    name: activeSearchLink.datasets,
    statusOptions:  TaskStatusOptions,
    statusOptionsLabels: {...EXPERIMENTS_TYPE_LABELS,...DATASETS_STATUS_LABEL},
    relevantSearchItems:{
      [activeSearchLink.datasets]:{name: activeSearchLink.datasets, viewAllResults: true, viewAllResultsLink: 'datasets', title: '数据集'},
      [activeSearchLink.openDatasetVersions]:{name: activeSearchLink.openDatasetVersions, viewAllResults: false, title: '数据集版本'},
    }
  },
  {
    label: '任务',
    showUserFilter: true,
    statusOptions:  TaskStatusOptions,
    statusOptionsLabels: EXPERIMENTS_TYPE_LABELS,
    typeOptions: TaskTypeOptions,
    name: activeSearchLink.experiments,
    relevantSearchItems:{
      [activeSearchLink.experiments]:{name: activeSearchLink.experiments, viewAllResults: true, viewAllResultsLink: 'projects/*/tasks', title: '任务'},
    }
  },
  {
    label: '模型',
    showUserFilter: true,
    statusOptions: ['created', 'published'],
    statusOptionsLabels: EXPERIMENTS_TYPE_LABELS,
    name: activeSearchLink.models,
    relevantSearchItems:{
      [activeSearchLink.models]:{name: activeSearchLink.models, viewAllResults: true, viewAllResultsLink: 'projects/*/models/', title: '模型'},
    }
  },
  {
    label: '流水线',
    showUserFilter: true,
    name: activeSearchLink.pipelines,
    statusOptions: TaskStatusOptions,
    statusOptionsLabels: EXPERIMENTS_TYPE_LABELS,
    relevantSearchItems:{
      'pipelines':{name: 'pipelines', viewAllResults: true, title: '流水线', viewAllResultsLink: 'pipelines/'},
      'pipelineRuns':{name: 'pipelineRuns', viewAllResults: false, loadMore: true, title: '流水线运行'},
    }
  },
  {
    label: '报告',
    showUserFilter: true,
    name: activeSearchLink.reports,
    statusOptions: ['created', 'published'],
    statusOptionsLabels: {created: '草稿',  published: '已发布'},
    relevantSearchItems:{
      [activeSearchLink.reports]:{name: activeSearchLink.reports, viewAllResults: true, viewAllResultsLink: 'reports/', title: '报告'},
    }
  },
  {
    label: '端点',
    showUserFilter: true,
    name: activeSearchLink.modelEndpoints,
    statusOptions: [],
    relevantSearchItems: {
      [activeSearchLink.modelEndpoints]:{name: activeSearchLink.modelEndpoints, viewAllResults: true, viewAllResultsLink: 'endpoints/active', title: '活跃端点'},
      [activeSearchLink.loadingEndpoints]:{name: activeSearchLink.loadingEndpoints, viewAllResults: true, viewAllResultsLink: 'endpoints/loading', title: '加载中的端点'},
    }
  },
] as {label: string; name: string; showUserFilter?: boolean, typeOptions: string[],statusOptions?: string[], statusOptionsLabels?:  Record<string,string> , relevantSearchItems: Record<string, SearchPageConfig>}[];
