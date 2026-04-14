import {ChangeDetectionStrategy, Component, computed, inject, viewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectHeaderMenu, selectHeaderMenuIndex} from '@common/core/reducers/view.reducer';
import {headerActions} from '@common/core/actions/router.actions';
import {MatTab, MatTabGroup, MatTabLabel} from '@angular/material/tabs';
import {CheckPermissionDirective} from '~/shared/directives/check-permission.directive';
import {NavigationCancel, NavigationCancellationCode, NavigationEnd, Router} from '@angular/router';
import {TooltipDirective} from '@common/shared/ui-components/indicators/tooltip/tooltip.directive';
import {SafeHtmlPipe} from 'primeng/menu';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material/tooltip';
import {FormsModule} from '@angular/forms';
import {explicitEffect} from 'ngxtension/explicit-effect';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';


@Component({
  selector: 'sm-header-navbar-tabs',
  templateUrl: './header-navbar-tabs.component.html',
  styleUrls: ['./header-navbar-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
    useValue: {showDelay: 500, position: 'below'} as MatTooltipDefaultOptions
  }],
  imports: [
    MatTabGroup,
    MatTab,
    CheckPermissionDirective,
    MatTabLabel,
    TooltipDirective,
    SafeHtmlPipe,
    FormsModule
  ]
})
export class HeaderNavbarTabsComponent {
  private store = inject(Store);
  private router = inject(Router);
  private readonly localizedLabels: Record<string, string> = {
    overview: '概览',
    workloads: '工作负载',
    tasks: '任务',
    models: '模型',
    workers: '工作节点',
    queues: '队列',
    details: '详情',
    hyperparameters: '超参数',
    scalars: '标量',
    plots: '图表',
    'debug samples': '调试样本',
    network: '网络',
    general: '通用',
    labels: '标签',
    metadata: '元数据',
    lineage: '血缘',
  };

  protected contextNavbar = this.store.selectSignal(selectHeaderMenu);
  contextNavbarLength = computed(() => {
    return this.contextNavbar()?.length;
  });
  protected index = this.store.selectSignal(selectHeaderMenuIndex);

  private tabGroup = viewChild(MatTabGroup);
  private lastKnownGoodIndex = this.getCurrentTabIndexFromRoute();
  private lastKnownGoodContextTabs = this.contextNavbar();

  private getRouteActiveKey(route: {featureName?: string; link?: string | string[]; header?: string} | null | undefined): string {
    if (!route) {
      return '';
    }

    if (route.featureName) {
      return route.featureName;
    }

    if (route.link) {
      return Array.isArray(route.link) ? String(route.link.at(-1) ?? '') : route.link;
    }

    return route.header ?? '';
  }

  setFeature(index) {
    const route = this.contextNavbar()?.[index];
    if (route?.link && index !== this.index()) {
      this.store.dispatch(headerActions.setActiveTab({activeFeature: this.getRouteActiveKey(route)}));
      if (typeof route.link === 'string') {
        this.router.navigateByUrl(route.link as string);
      } else {
        this.router.navigate(route.link as [], {
          queryParamsHandling: 'merge',
          ...(route.queryParams && {queryParams: route.queryParams, replaceUrl: true})
        });
      }
    }
  }

  constructor() {
    explicitEffect([this.contextNavbarLength],([currentTabsLength]) => {
      const tabGroupInstance = this.tabGroup();
      const currentIndex = this.index();

      if (tabGroupInstance && currentTabsLength) {
        window.setTimeout(() => {
          tabGroupInstance.selectedIndex = currentIndex;
          tabGroupInstance.updatePagination();
        });
      }
    });


    this.router.events
      .pipe(takeUntilDestroyed())
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.lastKnownGoodIndex = this.getCurrentTabIndexFromRoute();
          this.lastKnownGoodContextTabs = this.contextNavbar();
        } else if (event instanceof NavigationCancel && event.code === NavigationCancellationCode.GuardRejected) {
          if (this.lastKnownGoodContextTabs && (this.tabGroup()?.selectedIndex !== this.lastKnownGoodIndex || this.lastKnownGoodContextTabs?.length !== this.contextNavbar()?.length)) {
            this.store.dispatch(headerActions.setTabs({
              contextMenu: this.lastKnownGoodContextTabs,
              active: this.getRouteActiveKey(this.lastKnownGoodContextTabs?.[this.lastKnownGoodIndex])
            }));
          }
        }
      });
  }

  getCurrentTabIndexFromRoute(): number {
    return this.index() ?? 0;
  }

  getLocalizedLabel(header: string | null | undefined): string {
    if (!header) {
      return '';
    }

    return this.localizedLabels[header] ?? header.toUpperCase();
  }
}
