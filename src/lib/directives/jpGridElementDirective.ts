import { Directive, computed, inject, input, signal } from '@angular/core';
import { GridSpan } from '../types/responsiveGrid';
import { BreakpointService } from '../services/BreakpointService';

/**
 * Responsive directive controlling column span (`grid-column`) and row span (`grid-row`).
 * 
 * Can be matched explicitly via `jpGridElement` or implicitly whenever any responsive input
 * attribute (`col*` or `row*`) is present.
 * Implements a **Mobile-First** cascade: larger breakpoints inherit values from smaller ones
 * unless explicitly overridden.
 * 
 * - `colDefault`: defaults to **12** (full width on mobile).
 * - `rowDefault`: defaults to **1** (single row height).
 * 
 * @example
 * ```html
 * <!-- 12 columns by default, 6 on medium screens and up, spans 2 rows -->
 * <div [colMd]="6" [rowMd]="2">Card</div>
 * 
 * <!-- 12 columns on mobile, 4 columns on large screens -->
 * <div [colLg]="4">Card</div>
 * ```
 */
@Directive({
    selector: `
    [jpGridElement],
    [colDefault], [colXs], [colSm], [colMd], [colLg], [colXl], [colXXl],
    [rowDefault], [rowXs], [rowSm], [rowMd], [rowLg], [rowXl], [rowXXl]
  `,
    standalone: true,
    host: {
        '[style.grid-column]': 'gridColumnStyle()',
        '[style.grid-row]': 'gridRowStyle()',
        '[style.outline]': 'childDebugOutline()',
        '[style.cursor]': 'debugCursor()',
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()',
    },
})
export class JpGridElementDirective 
{
    private breakpointService = inject(BreakpointService);
    private isHovered = signal<boolean>(false);

    /**
       * Default column span (mobile-first fallback).
       * @default 12
       */
    colDefault = input<GridSpan>(12);

    /** Column span on Extra-Small screens (< 576px). */
    colXs = input<GridSpan | undefined>(undefined);

    /** Column span on Small screens (>= 576px). */
    colSm = input<GridSpan | undefined>(undefined);

    /** Column span on Medium screens (>= 768px). */
    colMd = input<GridSpan | undefined>(undefined);

    /** Column span on Large screens (>= 992px). */
    colLg = input<GridSpan | undefined>(undefined);

    /** Column span on Extra-Large screens (>= 1200px). */
    colXl = input<GridSpan | undefined>(undefined);

    /** Column span on Ultra-Wide screens (>= 1400px). */
    colXXl = input<GridSpan | undefined>(undefined);
    /**
   * Default row span count.
   * @default 1
   */
    rowDefault = input<number>(1);

    /** Row span on Extra-Small screens (< 576px). */
    rowXs = input<number | undefined>(undefined);

    /** Row span on Small screens (>= 576px). */
    rowSm = input<number | undefined>(undefined);

    /** Row span on Medium screens (>= 768px). */
    rowMd = input<number | undefined>(undefined);

    /** Row span on Large screens (>= 992px). */
    rowLg = input<number | undefined>(undefined);

    /** Row span on Extra-Large screens (>= 1200px). */
    rowXl = input<number | undefined>(undefined);

    /** Row span on Ultra-Wide screens (>= 1400px). */
    rowXXl = input<number | undefined>(undefined);

    // Résolution Mobile-First de la colonne
    protected currentSpan = computed<GridSpan>(() =>
    {
        const states = this.breakpointService.activeBreakpoints();
        let span: GridSpan = this.colDefault();

        if (states.xs && this.colXs() !== undefined)
            span = this.colXs()!;

        if (states.sm && this.colSm() !== undefined)
            span = this.colSm()!;

        if (states.md && this.colMd() !== undefined)
            span = this.colMd()!;

        if (states.lg && this.colLg() !== undefined)
            span = this.colLg()!;

        if (states.xl && this.colXl() !== undefined)
            span = this.colXl()!;

        if (states.xxl && this.colXXl() !== undefined)
            span = this.colXXl()!;

        return span;
    });

    // Résolution Mobile-First de la hauteur (row)
    protected currentRowSpan = computed<number>(() =>
    {
        const states = this.breakpointService.activeBreakpoints();
        let rowSpan: number = this.rowDefault();

        if (states.xs && this.rowXs() !== undefined)
            rowSpan = this.rowXs()!;

        if (states.sm && this.rowSm() !== undefined)
            rowSpan = this.rowSm()!;

        if (states.md && this.rowMd() !== undefined)
            rowSpan = this.rowMd()!;

        if (states.lg && this.rowLg() !== undefined)
            rowSpan = this.rowLg()!;

        if (states.xl && this.rowXl() !== undefined)
            rowSpan = this.rowXl()!;

        if (states.xxl && this.rowXXl() !== undefined)
            rowSpan = this.rowXXl()!;

        return rowSpan;
    });

    protected gridColumnStyle = computed(() => `span ${this.currentSpan()}`);
    protected gridRowStyle = computed(() => `span ${this.currentRowSpan()}`);

    // Outline conditionné par la variable CSS injectée par le conteneur jpGrid
    protected childDebugOutline = computed(() =>
    {
        if (this.isHovered())
            return 'calc(var(--jp-grid-debug, 0) * 2px) solid var(--jp-grid-child-hover-color, transparent)';

        return 'calc(var(--jp-grid-debug, 0) * 1px) dashed var(--jp-grid-child-color, transparent)';
    });

    protected debugCursor = computed(() =>
    {
        return this.isHovered() ? 'crosshair' : null;
    });

    protected onMouseEnter(): void
    {
        this.isHovered.set(true);
    }

    protected onMouseLeave(): void
    {
        this.isHovered.set(false);
    }
}