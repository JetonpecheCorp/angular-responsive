/*
 * Public API Surface of angular-responsive
 */
export * from './lib/directives/jpGridDirective';
export * from './lib/directives/jpGridElementDirective';

// Tableau pratique pour tout importer d'un coup
import { JpGridDirective } from './lib/directives/jpGridDirective'; 
import { JpGridElementDirective } from './lib/directives/jpGridElementDirective'; 

/**
 * Convenient bundle array to import all grid directives into standalone components.
 * 
 * @example
 * ```typescript
 * import { Component } from '@angular/core';
 * import { JP_RESPONSIVE_DIRECTIVES } from 'angular-responsive';
 * 
 * @Component({
 *   selector: 'app-root',
 *   standalone: true,
 *   imports: [JP_RESPONSIVE_DIRECTIVES],
 *   templateUrl: './app.component.html',
 * })
 * export class AppComponent {}
 * ```
 */
export const JP_RESPONSIVE_DIRECTIVES = [
  JpGridDirective,
  JpGridElementDirective
] as const;