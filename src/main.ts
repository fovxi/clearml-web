import {enableProdMode} from '@angular/core';
import {AppModule} from '~/app.module';
import {ConfigurationService, fetchConfigOutSideAngular} from '@common/shared/services/configuration.service';
import {updateHttpUrlBaseConstant} from '~/app.constants';
import {Environment} from './environments/base';
import {platformBrowser} from '@angular/platform-browser';
import {APP_BASE_HREF, registerLocaleData} from '@angular/common';
import localeZh from '@angular/common/locales/zh';
const environment = ConfigurationService.globalEnvironment;

registerLocaleData(localeZh, 'zh-CN');

if (environment.production) {
  enableProdMode();
}

(async () => {
  let configData = {} as Environment;
  try {
    configData = await fetchConfigOutSideAngular();
    (window as any).configuration = configData;
  } finally {
    const baseHref = (window as any).__env.subPath || '' as string;
    updateHttpUrlBaseConstant({...environment, ...configData, ...(baseHref && !baseHref.startsWith('${') && {apiBaseUrl: baseHref + environment.apiBaseUrl})});
    await platformBrowser([
      {provide: APP_BASE_HREF, useValue: configData.baseHref ?? ''}
    ]).bootstrapModule(AppModule);
  }
})();
