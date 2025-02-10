import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { WssStore } from '@store';

@Component({
  selector: 'app-market-data',
  imports: [DatePipe],
  templateUrl: './market-data.component.html',
  styleUrl: './market-data.component.scss',
})
export class MarketDataComponent {
  private wssStore = inject(WssStore);

  public value = this.wssStore.currentValue;
  public isConnected = this.wssStore.isConnected;
  public instrument = this.wssStore.activeInstrument;
}
