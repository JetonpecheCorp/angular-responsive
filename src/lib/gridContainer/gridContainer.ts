import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, computed, HostBinding, inject, input, signal } from '@angular/core';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'jp-grid-container',
  styleUrl: './gridContainer.css',
  template: "<ng-content></ng-content>",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridContainer
{
    gap = input<number>(6);
	nbColDefault = input<number>(12);

	nbColXs = input<number>();
	nbColSm = input<number>();
	nbColMd = input<number>();
	nbColLg = input<number>();
	nbColXl = input<number>();

	gridFlowDefault = input<"row" | "column" | "dense" | "row dense" | "column dense">("row");

	gridFlowXs = input<"row" | "column" | "dense" | "row dense" | "column dense">();
	gridFlowSm = input<"row" | "column" | "dense" | "row dense" | "column dense">();
	gridFlowMd = input<"row" | "column" | "dense" | "row dense" | "column dense">();
	gridFlowLg = input<"row" | "column" | "dense" | "row dense" | "column dense">();
	gridFlowXl = input<"row" | "column" | "dense" | "row dense" | "column dense">();

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

	private gapStyle = computed(() => `${this.gap()}px`);

	private gridRowStyle = computed(() => 
    {   
        let mode = this.gridFlowDefault();

        if(this.estTailleXs())
            mode = this.gridFlowXs() ?? this.gridFlowDefault();
        
        else if(this.estTailleSm())
            mode = this.gridFlowSm() ?? this.gridFlowXs() ?? this.gridFlowDefault();

        else if(this.estTailleMd())
            mode = this.gridFlowMd() ?? this.gridFlowSm() ?? this.gridFlowXs() ?? this.gridFlowDefault();

        else if(this.estTailleLg())
            mode = this.gridFlowLg() ?? this.gridFlowMd() ?? this.gridFlowSm() ?? this.gridFlowXs() ?? this.gridFlowDefault();

        else if(this.estTailleXl())
            mode = this.gridFlowXl() ?? this.gridFlowLg() ?? this.gridFlowMd() ?? this.gridFlowSm() ?? this.gridFlowXs() ?? this.gridFlowDefault();

        return mode;
    });

	private nbColGridStyle = computed(() => 
    {   
        let nombre = this.nbColDefault();

        if(this.estTailleXs())
            nombre = this.nbColXs() ?? this.nbColDefault();
        
        else if(this.estTailleSm())
            nombre = this.nbColSm() ?? this.nbColXs() ?? this.nbColDefault();

        else if(this.estTailleMd())
            nombre = this.nbColMd() ?? this.nbColSm() ?? this.nbColXs() ?? this.nbColDefault();

        else if(this.estTailleLg())
            nombre = this.nbColLg() ?? this.nbColMd() ?? this.nbColSm() ?? this.nbColXs() ?? this.nbColDefault();

        else if(this.estTailleXl())
            nombre = this.nbColXl() ?? this.nbColLg() ?? this.nbColMd() ?? this.nbColSm() ?? this.nbColXs() ?? this.nbColDefault();

        return `repeat(${nombre}, 1fr)`;
    });

	@HostBinding("class")
	private get hostClassCss()
	{
		return "grid-container";
	}

	@HostBinding("style.grid-auto-flow")
	private get hostGridAutoFlowCss()
	{
		return this.gridRowStyle();
	}

	@HostBinding("style.gap")
	private get hostStyleCss()
	{
		return this.gapStyle();
	}

	@HostBinding("style.grid-template-columns")
	private get hostStyle2Css()
	{
		return this.nbColGridStyle();
	}
}