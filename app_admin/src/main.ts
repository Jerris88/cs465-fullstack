import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { App } from './app/app';
import { appConfig } from './app/app.config';
import { jwtInterceptor } from './app/jwt-interceptor';

// Bootstrap application with existing config and HTTP interceptor
bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    // Attach JWT to secured HTTP requests
    provideHttpClient(withInterceptors([jwtInterceptor]))
  ]
}).catch((err) => console.error(err));
