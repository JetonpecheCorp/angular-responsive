/**
 * Représente le nombre de colonnes qu'un élément peut occuper (de 1 à 12).
 */
export type GridSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * Identifiants des paliers d'écran gérés par le moteur responsive.
 * - `xs` : Mobile (< 576px)
 * - `sm` : Tablette portrait (>= 576px)
 * - `md` : Tablette paysage (>= 768px)
 * - `lg` : Ordinateur portable / Bureau (>= 992px)
 * - `xl` : Grand écran (>= 1200px)
 * - `xxl` : Écran ultra-large (>= 1400px)
 */
export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Ordre séquentiel des paliers pour la cascade mobile-first.
 */
export const BREAKPOINTS_ORDER: BreakpointKey[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

/**
 * Définition des requêtes médias (media queries) associées à chaque palier d'écran.
 */
export const GRID_MEDIA_QUERIES: Record<BreakpointKey, string> = {
  xs: '(max-width: 575.98px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1400px)',
};