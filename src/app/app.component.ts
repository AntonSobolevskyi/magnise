import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MarketComponent } from '@components';
import { AppStore } from '@store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [MarketComponent, MatToolbarModule],
})
export class AppComponent {
  private appStore = inject(AppStore);

  public isInitialized = this.appStore.isInitialized;
}
