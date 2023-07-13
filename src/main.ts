/**
 * The entry point of the Angular application.
 */

// Importing the necessary module from Angular to enable dynamic browser platform
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Importing the root module of the application
import { AppModule } from './app/app.module';

/**
 * Bootstrap the AppModule to start the Angular application.
 * @returns A promise that resolves when the application is successfully bootstrapped or rejects with an error.
 */
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
