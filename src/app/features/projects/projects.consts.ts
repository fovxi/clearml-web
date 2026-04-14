import {HeaderNavbarTabConfig} from '@common/layout/header-navbar-tabs/header-navbar-tabs-config.types';
import {ProjectsGetUserNamesRequest} from '~/business-logic/model/projects/projectsGetUserNamesRequest';
import EntityEnum = ProjectsGetUserNamesRequest.EntityEnum;

export const PROJECTS_FEATURES = ['models',' experiments', 'overview'];

export const PROJECT_ROUTES = [
  {header: '概览', id: 'overviewTab'},
  {header: '工作负载', id: 'workloadTab'},
  {header: '任务', id: 'experimentsTab'},
  {header: '模型', id: 'modelsTab'}
] as HeaderNavbarTabConfig[];

export const fetchUsersForTypes: EntityEnum[] = ['task', 'model']
