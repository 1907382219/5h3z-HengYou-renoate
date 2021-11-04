import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));

addEventListener('resize', () => {
    const size = window.innerWidth > window.innerHeight
        ? window.innerWidth
        : window.innerHeight;
    document.documentElement.style.fontSize = size / 50 + 'px';
});
window.dispatchEvent(new Event('resize'));
