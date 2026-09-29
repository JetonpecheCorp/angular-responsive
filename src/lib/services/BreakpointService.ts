import { Injectable, signal, inject, DestroyRef } from '@angular/core';
import { BreakpointKey, GRID_MEDIA_QUERIES } from '../types/responsiveGrid';

/**
 * Service interne d'écoute des changements de résolution d'écran via `window.matchMedia`.
 * 
 * Fonctionne nativement avec les signaux (zoneless compatible, sans dépendance à NgZone).
 * Nettoie automatiquement les écouteurs d'événements à la destruction du service via `DestroyRef`.
 * Protégé contre les erreurs lors de l'exécution côté serveur (SSR).
 */
@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  private readonly destroyRef = inject(DestroyRef);

  /**
   * Dictionnaire réactif indiquant l'état de chaque palier d'écran.
   * Vaut `true` si la requête média correspondante est active.
   */
  readonly activeBreakpoints = signal<Record<BreakpointKey, boolean>>({
    xs: true,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    xxl: false,
  });

  constructor() {
    // Évite l'exécution côté serveur (SSR)
    if (typeof window === 'undefined') return;

    for (const [key, query] of Object.entries(GRID_MEDIA_QUERIES) as [BreakpointKey, string][]) {
      const mql = window.matchMedia(query);
      this.updateState(key, mql.matches);

      const listener = (event: MediaQueryListEvent): void => {
        this.updateState(key, event.matches);
      };

      mql.addEventListener('change', listener);

      // Désinscription automatique lors du cycle de vie
      this.destroyRef.onDestroy(() => {
        mql.removeEventListener('change', listener);
      });
    }
  }

  /**
   * Met à jour l'état d'un palier d'écran spécifique dans le signal.
   * 
   * @param key Identifiant du palier ('xs', 'sm', etc.)
   * @param matches Indique si la requête média est vérifiée
   */
  private updateState(key: BreakpointKey, matches: boolean): void {
    this.activeBreakpoints.update((current) => ({
      ...current,
      [key]: matches,
    }));
  }
}