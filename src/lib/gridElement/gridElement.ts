import { ChangeDetectionStrategy, computed, HostBinding, inject, input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: 'jp-grid-element',
  template: "<ng-content></ng-content>",
  styleUrl: './gridElement.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridElement
{
    colDefault = input<number>(1);

    colXs = input<number>();
    colSm = input<number>();
    colMd = input<number>();
    colLg = input<number>();
    colXl = input<number>();

    rowDefault = input<number>(1);

    rowXs = input<number>();
    rowSm = input<number>();
    rowMd = input<number>();
    rowLg = input<number>();
    rowXl = input<number>();

    private breakpointObserver = inject(BreakpointObserver);

    private estTailleXs = toSignal(
        this.breakpointObserver.observe(Breakpoints.XSmall).pipe(map(x => x.matches)),
        { initialValue: false }
    );

    private estTailleSm = toSignal(
        this.breakpointObserver.observe(Breakpoints.Small).pipe(map(x => x.matches)),
        { initialValue: false }
    );

    private estTailleMd = toSignal(
        this.breakpointObserver.observe(Breakpoints.Medium).pipe(map(x => x.matches)),
        { initialValue: false }
    );

    private estTailleLg = toSignal(
        this.breakpointObserver.observe(Breakpoints.Large).pipe(map(x => x.matches)),
        { initialValue: false }
    );

    private estTailleXl = toSignal(
        this.breakpointObserver.observe(Breakpoints.XLarge).pipe(map(x => x.matches)),
        { initialValue: false }
    );

    private gridColumnStyle = computed(() => 
    {   
        let nombre = this.colDefault();

        if (this.estTailleXs()) 
            nombre = this.colXs() ?? this.colDefault();

        else if (this.estTailleSm())
            nombre = this.colSm() ?? this.colXs() ?? this.colDefault();

        else if (this.estTailleMd())
            nombre = this.colMd() ?? this.colSm() ?? this.colXs() ?? this.colDefault();
        
        else if (this.estTailleLg())
            nombre = this.colLg() ?? this.colMd() ?? this.colSm() ?? this.colXs() ?? this.colDefault();
        
        else if (this.estTailleXl())
            nombre = this.colXl() ?? this.colLg() ?? this.colMd() ?? this.colSm() ?? this.colXs() ?? this.colDefault();

        return `span ${nombre}`;
    });

    private gridRowStyle = computed(() => 
    {   
        let nombre = this.rowDefault();

        if(this.estTailleXs())
            nombre = this.rowXs() ?? this.rowDefault();
        
        else if(this.estTailleSm())
            nombre = this.rowSm() ?? this.rowXs() ?? this.rowDefault();

        else if(this.estTailleMd())
            nombre = this.rowMd() ?? this.rowSm() ?? this.rowXs() ?? this.rowDefault();

        else if(this.estTailleLg())
            nombre = this.rowLg() ?? this.rowMd() ?? this.rowSm() ?? this.rowXs() ?? this.rowDefault();

        else if(this.estTailleXl())
            nombre = this.rowXl() ?? this.rowLg() ?? this.rowMd() ?? this.rowSm() ?? this.rowXs() ?? this.rowDefault();

        return `span ${nombre}`;
    });

    @HostBinding('style.grid-column')
    protected get hostGridColumn() 
    {
        return this.gridColumnStyle();
    }

    @HostBinding('style.grid-row')
    protected get hostGridRow() 
    {
        return this.gridRowStyle();
    }
}