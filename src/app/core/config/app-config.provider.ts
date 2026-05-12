import { inject, provideAppInitializer } from "@angular/core";
import { AppConfigService } from "./app-config.service";

function initializeAppConfig(): () => void {
  const service = inject(AppConfigService);
  return () => service.init();
}

export const provideAppConfig = () => (provideAppInitializer(() => {
        const initializerFn = (initializeAppConfig)();
        return initializerFn();
      }));