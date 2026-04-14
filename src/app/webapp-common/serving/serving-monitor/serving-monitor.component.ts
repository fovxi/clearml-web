import {ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal, viewChild} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {Store} from '@ngrx/store';
import {AngularSplitModule} from 'angular-split';
import {ServingStatsComponent} from '@common/serving/serving-stats/serving-stats.component';
import {timeFrameOptions} from '@common/constants';
import {MatFormField} from '@angular/material/form-field';
import {MatOption} from '@angular/material/autocomplete';
import {MatSelect} from '@angular/material/select';
import {servingFeature} from '@common/serving/serving.reducer';
import {FormsModule} from '@angular/forms';
import {ServingActions} from '@common/serving/serving.actions';
import {
  ServingGetEndpointMetricsHistoryRequest
} from '~/business-logic/model/serving/servingGetEndpointMetricsHistoryRequest';
import {TooltipDirective} from '@common/shared/ui-components/indicators/tooltip/tooltip.directive';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import MetricTypeEnum = ServingGetEndpointMetricsHistoryRequest.MetricTypeEnum;
import {SelectableGroupedFilterListComponent} from '@common/shared/ui-components/data/selectable-grouped-filter-list/selectable-grouped-filter-list.component';
import {GroupedList} from '@common/tasks/tasks.model';

@Component({
    selector: 'sm-serving-monitor',
    templateUrl: './serving-monitor.component.html',
    styleUrl: './serving-monitor.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatDrawerContent,
        MatDrawerContainer,
        MatDrawer,
        AngularSplitModule,
        ServingStatsComponent,
        MatFormField,
        MatOption,
        MatSelect,
        FormsModule,
        TooltipDirective,
        MatButton,
        MatIcon,
        MatIconButton,
        SelectableGroupedFilterListComponent
    ]
})
export class ServingMonitorComponent {
  private store = inject(Store);

  private charts = viewChild<ElementRef<HTMLDivElement>>('charts');
  public searchTerm = signal('');
  public currentTimeFrame = this.store.selectSignal<string>(servingFeature.selectStatsTimeFrame);
  public hiddenCharts = this.store.selectSignal(servingFeature.selectHiddenCharts);
  public selectedCharts = computed(() =>
    this.chartParamOptions.map(name => name.label).filter(metric => !this.hiddenCharts().includes(metric))
  );

  timeFrameOptions = timeFrameOptions;
  public chartParamOptions: { label: string; value: MetricTypeEnum }[] = [
    {label: '请求总数', value: MetricTypeEnum.Requests},
    {label: '每分钟请求数', value: MetricTypeEnum.RequestsMin},
    {label: '平均延迟 (ms)', value: MetricTypeEnum.LatencyMs},
    {label: 'CPU 数量', value: MetricTypeEnum.CpuCount},
    {label: 'GPU 数量', value: MetricTypeEnum.GpuCount},
    {label: '平均 CPU 负载 (%)', value: MetricTypeEnum.CpuUtil},
    {label: '平均 GPU 利用率 (%)', value: MetricTypeEnum.GpuUtil},
    {label: '内存使用量 (GB)', value: MetricTypeEnum.RamTotal},
    {label: '内存空闲量 (GB)', value: MetricTypeEnum.RamFree},
    {label: 'GPU 显存使用量 (GB)', value: MetricTypeEnum.GpuRamTotal},
    {label: 'GPU 显存空闲量 (GB)', value: MetricTypeEnum.GpuRamFree},
    {label: '网络吞吐量 RX (MBps)', value: MetricTypeEnum.NetworkRx},
    {label: '网络吞吐量 TX (MBps)', value: MetricTypeEnum.NetworkTx}
  ];

  chartsList: GroupedList = this.chartParamOptions.reduce((acc, curr) => {
    acc[curr.label] = {};
    return acc;
  }, {});

  searchTermChanged(searchTerm: string) {
    this.searchTerm.set(searchTerm);
  }

  metricSelected(id: string) {
    const element = this.charts().nativeElement.getElementsByClassName(id)?.[0] as HTMLDivElement;
    if (element) {
      this.charts().nativeElement.scrollTo({top: element.offsetTop - 60, behavior: 'smooth'});
    } else {
      this.charts().nativeElement.scrollTo({top: 0, behavior: 'smooth'});
    }
  }

  selectedMetricListChanged(selectedList: string[]) {
    this.store.dispatch(ServingActions.setChartHidden({
      // hiddenList: selectedList as MetricTypeEnum[]
    hiddenList: this.chartParamOptions.map(name => name.label).filter(metric => !selectedList.includes(metric)) as MetricTypeEnum[]
    }));
  }

  timeFrameChange(event) {
    this.store.dispatch(ServingActions.setStatsTimeframe({timeFrame: event}));
  }
}
