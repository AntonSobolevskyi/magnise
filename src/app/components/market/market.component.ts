import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { InstrumentsStore, WssStore } from '@store';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExchangeName, Instrument, ProviderName } from '@models';
import { toSignal } from '@angular/core/rxjs-interop';
import { MarketDataComponent } from '../market-data/market-data.component';
import { ChartComponent } from '../chart/chart.component';
import { ChartPeriodComponent } from '../chart-period/chart-period.component';

@Component({
  selector: 'app-market',
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MarketDataComponent,
    ChartComponent,
    ChartPeriodComponent,
  ],
  templateUrl: './market.component.html',
  styleUrl: './market.component.scss',
  providers: [InstrumentsStore],
})
export class MarketComponent implements OnInit {
  private wssStore = inject(WssStore);
  private instrumentsStore = inject(InstrumentsStore);
  private fb = inject(FormBuilder);

  public formGroup = this.fb.group({
    provider: this.fb.control<ProviderName | null>(null),
    exchange: this.fb.control<ExchangeName | null>(null),
    instrument: this.fb.control<Instrument | null>(null, [Validators.required]),
  });

  public selectedProvider = toSignal(
    this.formGroup.controls.provider.valueChanges,
    { initialValue: null }
  );
  public selectedExchange = toSignal(
    this.formGroup.controls.exchange.valueChanges,
    { initialValue: null }
  );

  providerEffect = effect(() => {
    const provider = this.selectedProvider();

    this.instrumentsStore.setActiveProvider(provider);
    this.formGroup.controls.exchange.setValue(null);
  });

  exchangeEffect = effect(() => {
    const exchange = this.selectedExchange();

    this.formGroup.controls.instrument.setValue(null);
  });

  public providers = this.instrumentsStore.providers;
  public exchanges = this.instrumentsStore.exchanges;
  public instruments = computed(() => {
    const exchange = this.selectedExchange();

    return this.instrumentsStore
      .instruments()
      .filter((instrument) =>
        exchange ? instrument.exchange === exchange : true
      );
  });
  public isConnected = this.wssStore.isConnected;

  public ngOnInit(): void {
    this.instrumentsStore.updateProviders();
  }

  public onSubmit() {
    const { provider, instrument } = this.formGroup.value;

    if (!provider || !instrument) {
      return;
    }

    this.wssStore.listen({ instrument, provider });
  }
}
