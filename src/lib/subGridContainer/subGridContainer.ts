import { ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: "jp-sub-grid-container",
  styleUrl: "./subGridContainer.css",
  template: "<ng-content></ng-content>",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubGridContainer 
{ 
    @HostBinding("class")
	private get hostClassCss()
	{
		return "sub-grid-container";
	}
}