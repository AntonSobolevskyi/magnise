import { Component, inject } from '@angular/core';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { ranges } from '@models';
import { WssStore } from '@store';

@Component({
  selector: 'app-chart-period',
  imports: [MatChipsModule],
  templateUrl: './chart-period.component.html',
  styleUrl: './chart-period.component.scss',
})
export class ChartPeriodComponent {
  private wssStore = inject(WssStore);

  public ranges = ranges;
  public value = this.wssStore.range;

  public onChange(event: MatChipListboxChange) {
    this.wssStore.changeRange(event.value);
  }
}
