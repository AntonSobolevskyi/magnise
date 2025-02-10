import { Component, effect, inject, signal } from '@angular/core';
import { BarsService } from '@api';
import { Instrument, ProviderName, Range } from '@models';
import { WssStore } from '@store';

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent {
  private barsService = inject(BarsService);
  private wssStore = inject(WssStore);

  public chart = signal<any>(null);
  public isConnected = this.wssStore.isConnected;

  instrumentEffect = effect(() => {
    const instrument = this.wssStore.activeInstrument();
    const provider = this.wssStore.activeProvider();
    const range = this.wssStore.range();

    if (instrument && provider) {
      this.updateChart(instrument, provider, range);
    }
  });

  private updateChart(
    instrument: Instrument,
    provider: ProviderName,
    range: Range,
  ): void {
    this.barsService
      .dateRange({ instrument, provider, range })
      .subscribe((response) => {
        const existChart = this.chart();

        existChart?.destroy();

        const min = Math.min(...response.data.map((bar) => bar.l));
        const max = Math.max(...response.data.map((bar) => bar.h));

        const chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: response.data.map((bar) => ''),
            datasets: [
              {
                data: response.data.map((bar) => {
                  return [bar.l, bar.h];
                }),
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                max,
                min,
              },
            },
          },
        });

        this.chart.set(chart);
      });
  }
}
