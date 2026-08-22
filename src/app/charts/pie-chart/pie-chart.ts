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
          return 50;

        default:
          return 8;
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
          return '#14c187';

        case 1:
          return '#eed922';

        default:
          return '#ec4c30';
      }
    });

    this.chartInstance?.setOption({

      animation: !this.hasRendered,
      animationDuration: 1800,
      animationEasing: 'cubicOut',

      title: {
        text: `Your Application's Progress`,
        left: 'center',
        top: 10,
        textStyle: {
          fontSize: 20,
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
        left: '22%',
        right: '5%',
        top: '15%',
        bottom: '8%',
        containLabel: true
      },

      xAxis: {
        type: 'value',

        min: 0,
        max: 100,

        name: 'Progress (%)',
        nameLocation: 'middle',
        nameGap: 30,

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
        nameGap: 120,

        axisTick: {
          show: false
        },

        axisLine: {
          show: false
        },

        axisLabel: {
          color: '#374151',
          fontSize: 14,
          fontWeight: 'bold',
          width: 180,
          overflow: 'break'
        }
      },

      series: [
        {
          name: 'Progress',

          type: 'bar',

          data: values,

          barWidth: 40,

          showBackground: true,

          backgroundStyle: {
            color: '#f3f4f6',
            borderRadius: 14
          },

          itemStyle: {

            borderRadius: 14,

            color: (params: any) => {

              return colors[params.dataIndex];
            }
          },

          label: {

            show: true,

            position: 'right',

            fontWeight: 'bold',

            color: '#374151',

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