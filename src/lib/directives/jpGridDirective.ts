import { Directive, booleanAttribute, computed, input } from '@angular/core';

/**
 * Responsive CSS Grid container directive.
 * 
 * Turns any HTML element into a CSS Grid container with customizable column counts,
 * auto-flow patterns, and gaps. Also includes an integrated visual debug mode that draws
 * non-intrusive outlines and cascades child outline colors via CSS variables.
 * 
 * @example
 * ```html
 * <!-- Basic 12-column grid container with 16px gap -->
 * <div jpGrid [gap]="16">
 *   ...
 * </div>
 * 
 * <!-- Grid with debug mode enabled and custom hex colors -->
 * <div jpGrid [gap]="12" debug debugParentColor="#ff0055" debugChildColor="#00bbff">
 *   ...
 * </div>
 * ```
 */
@Directive({
  selector: '[jpGrid]',
  standalone: true,
  host: {
    '[style.display]': '"grid"',
    '[style.grid-template-columns]': 'columnsStyle()',
    '[style.grid-auto-flow]': 'gridFlow()',
    '[style.gap.px]': 'gap()',
    '[style.outline]': 'debugOutline()',
    '[style.--jp-grid-child-color]': 'debugChildColor()',
    '[style.--jp-grid-child-hover-color]': 'debugChildHoverColor()',
    '[style.--jp-grid-debug]': 'debug() ? "1" : "0"',
  },
})
export class JpGridDirective 
{
  /**
     * Total number of template columns for the grid.
     * @default 12
     */
  nbCol = input<number>(12);

  /**
   * Spacing between columns and rows in pixels.
   * @default 6
   */
  gap = input<number>(6);

  /**
   * Placement algorithm for auto-placed items (`grid-auto-flow`).
   * Supported values include: `'row'`, `'column'`, `'dense'`, `'column dense'`.
   * @default 'row'
   */
  gridFlow = input<string>('row');

  /**
   * Toggles the visual debug outlines.
   * Accepts a boolean or the bare presence of the attribute (`debug`).
   * @default false
   */
  debug = input(false, { transform: booleanAttribute });

  /**
   * Hex color applied to the container outline in debug mode.
   * @default '#e11d48'
   */
  debugParentColor = input<string>('#e11d48');

  /**
   * Hex color forwarded to child grid elements for their debug outline.
   * @default '#0284c7'
   */
  debugChildColor = input<string>('#0284c7');

  /** 
   * Hex color applied to children outlines on hover 
   * @default '#f59e0b'
   */
  debugChildHoverColor = input<string>('#f59e0b');

  protected columnsStyle = computed(() => `repeat(${this.nbCol()}, 1fr)`);

  protected debugOutline = computed(() =>
  {
    return this.debug() ? `2px solid ${this.debugParentColor()}` : null;
  });
}