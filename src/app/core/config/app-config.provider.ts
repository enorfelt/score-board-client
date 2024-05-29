import { APP_INITIALIZER, inject } from "@angular/core";
import { AppConfigService } from "./app-config.service";

function initializeAppConfig(): () => void {
  const service = inject(AppConfigService);
  return () => service.init();
}

export const provideAppConfig = () => ({
  provide: APP_INITIALIZER,
  useFactory: initializeAppConfig,
  deps: [],
  multi: true
});