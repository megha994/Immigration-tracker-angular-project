import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  OnInit,
  OnDestroy,
  DoCheck,
  Inject,
  PLATFORM_ID
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import * as echarts from 'echarts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.html',
  styleUrls: ['./pie-chart.css']
})
export class PieChartComponent implements OnInit, DoCheck, OnDestroy {

  @ViewChild('chartContainer', { static: true })
  chartContainer!: ElementRef<HTMLDivElement>;

  @Input()
  chartData: any[] = [];

  private chartInstance: echarts.ECharts | null = null;
  private hasRendered = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.chartInstance = echarts.init(
      this.chartContainer.nativeElement
    );

    window.addEventListener(
      'resize',
      this.resizeChart
    );

    if (this.chartData.length) {
      this.renderChart();
    }
  }

  ngDoCheck(): void {

    if (
      this.chartInstance &&
      this.chartData &&
      this.chartData.length
    ) {
      this.renderChart();
    }
  }

  ngOnDestroy(): void {

    window.removeEventListener(
      'resize',
      this.resizeChart
    );

    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  }

  private renderChart(): void {

    const labels = this.chartData.map(
      item => item.name
    );

    const values = this.chartData.map(item => {

      switch (item.value) {

        case 2:
          return 100;

        case 1:
          return 60;

        default:
          return 20;
      }
    });

    const statusLabels = this.chartData.map(item => {

      switch (item.value) {

        case 2:
          return 'COMPLETED';

        case 1:
          return 'IN PROGRESS';

        default:
          return 'NOT STARTED';
      }
    });

    const colors = this.chartData.map(item => {

      switch (item.value) {

        case 2:
          return '#57d487';

        case 1:
          return '#e3cc59';

        default:
          return '#df4b4b';
      }
    });
    this.chartInstance?.setOption({
      animation: !this.hasRendered,
      animationDuration: 1800,
      animationEasing: 'cubicOut',

      title: {
        text: `Your Application's Progress`,
        left: 'center',
        top: 5,
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#374151'
        }
      },

      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },

        formatter: (params: any) => {
          const index = params[0].dataIndex;

          return `
        <b>${labels[index]}</b><br/>
        Status: ${statusLabels[index]}
      `;
        }
      },

      grid: {
        left: '280',
        right: '120',
        top: '15%',
        bottom: '8%',
        containLabel: false
      },

      xAxis: {
        type: 'value',
        min: 0,
        max: 100,

        name: 'Progress (%)',
        nameLocation: 'middle',
        nameGap: 25,

        position: 'top',

        axisLabel: {
          formatter: '{value}%'
        },

        splitLine: {
          show: true,
          lineStyle: {
            color: '#e5e7eb'
          }
        }
      },

      yAxis: {
        type: 'category',
        inverse: true,

        data: labels,

        name: 'Application Steps',
        nameLocation: 'middle',
        nameGap: 170,

        axisTick: {
          show: false
        },

        axisLine: {
          show: false
        },

        axisLabel: {
          color: '#374151',
          fontSize: 12,
          fontWeight: 'bold',
          width: 300,
          overflow: 'break',
        }
      },

      series: [
        {
          name: 'Progress',
          type: 'bar',

          data: values,

          barWidth: 24,

          showBackground: true,

          backgroundStyle: {
            color: '#f3f4f6',
            borderRadius: 10
          },

          itemStyle: {
            borderRadius: 10,

            color: (params: any) => {
              return colors[params.dataIndex];
            }
          },

          label: {
            show: true,
            color: '#fdfafa',
            fontWeight: 'bold',
            fontSize:12,
            overflow: 'truncate',

            formatter: (params: any) => {
              return statusLabels[params.dataIndex];
            }
          }
        }
      ]
    });

    this.hasRendered = true;
  }
  private resizeChart = (): void => {

    if (this.chartInstance) {
      this.chartInstance.resize();
    }
  };
}