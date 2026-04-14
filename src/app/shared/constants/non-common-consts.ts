import {TaskStatusEnum} from '~/business-logic/model/tasks/taskStatusEnum';
import {TaskTypeEnum} from '~/business-logic/model/tasks/taskTypeEnum';

export enum EntityTypeEnum {
  experiment = 'task',
  model = 'model',
  project = 'project',
  pipeline = 'pipeline',
  controller = 'pipeline run',
  dataset = 'version',
  openDataset = 'dataset',
  report = 'report',
  endpoint = 'endpoint',
  endpointsContainer = 'endpoints container'
}

export enum CircleTypeEnum {
  completed = 'completed',
  running = 'running',
  pending = 'pending',
  failed = 'failed',
  empty = 'empty',
  total = 'total',
  published = 'published',
  'model-labels' = 'model-labels'
}

export const ENTITY_TYPE_LABELS = {
  [EntityTypeEnum.experiment]: '任务',
  [EntityTypeEnum.model]: '模型',
  [EntityTypeEnum.project]: '项目',
  [EntityTypeEnum.pipeline]: '流水线',
  [EntityTypeEnum.controller]: '流水线运行',
  [EntityTypeEnum.dataset]: '版本',
  [EntityTypeEnum.openDataset]: '数据集',
  [EntityTypeEnum.report]: '报告',
  [EntityTypeEnum.endpoint]: '端点',
  [EntityTypeEnum.endpointsContainer]: '端点容器'
};

export const EXPERIMENTS_TYPE_LABELS = {
  [TaskStatusEnum.Created]     : '草稿',
  [TaskStatusEnum.Queued]      : '等待中',
  [TaskStatusEnum.InProgress]  : '运行中',
  [TaskStatusEnum.Completed]   : '已完成',
  [TaskStatusEnum.Published]   : '已发布',
  [TaskStatusEnum.Failed]      : '失败',
  [TaskStatusEnum.Stopped]     : '已中止',
  [TaskStatusEnum.Closed]      : '已关闭',
  [TaskTypeEnum.Testing]       : '测试',
  [TaskTypeEnum.Training]      : '训练',
  [TaskTypeEnum.Inference]     : '推理',
  [TaskTypeEnum.DataProcessing]: '数据处理',
  [TaskTypeEnum.Application]   : '应用',
  [TaskTypeEnum.Monitor]       : '监控',
  [TaskTypeEnum.Controller]    : '控制器',
  [TaskTypeEnum.Optimizer]     : '优化器',
  [TaskTypeEnum.Service]       : '服务',
  [TaskTypeEnum.Qc]            : 'QC',
  [TaskTypeEnum.Custom]        : '自定义'
};

export const hideDeleteArtifactsEntities = [EntityTypeEnum.model];

export const cloneExtraToggles = () => ['保留原始依赖包'];
export const cloneExtraActions = (data: unknown) => ({});
