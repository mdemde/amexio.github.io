/**
 * Created by ketangote on 12/1/17.
 */
/*
 Component Name : Amexio RightAllignedTab
 Component Selector : <amexio-right-vertical-tab-view >
 Component Description : Right Aligned Vertical Tab component for Angular Apps with multiple
 configurations such as Tab, Icon support.
*/
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {AmexioTabPill} from '../tab.pill.component';

@Component({
  selector: 'amexio-right-vertical-tab-view',
  templateUrl: './right.vertical.component.html',
  styleUrls: ['../tab.component.scss'],
})
export class AmexioRightVerticalTabComponent implements AfterContentInit, AfterViewInit, OnInit {

  @ViewChild('tab', {read: ElementRef}) public tabs: ElementRef;

  @ContentChildren(AmexioTabPill) queryTabs: QueryList<AmexioTabPill>;

  tabCollection: AmexioTabPill[];

    /*
Events
name : onClick
datatype :none
version : 4.0 onwards
default : none
description : Callback to invoke on activated tab event.
*/
  @Output() onClick: any = new EventEmitter<any>();

  content: string;

  constructor(public render: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.tabs.nativeElement.scrollWidth > this.tabs.nativeElement.clientWidth) {
    }
  }

  ngAfterContentInit() {
    this.tabCollection = this.queryTabs.toArray();
  }

  onTabClick(tab: any) {
    if (!tab.disabled ) {
      for (let i = 0; i < this.tabCollection.length; i++) {
        if (this.tabCollection[i] === tab) {
          this.tabCollection[i]['active'] = true;
          this.onClick.emit(tab);
        } else {
          this.tabCollection[i]['active'] = false;
        }
      }
    }
  }

  closeTab(tabNode: AmexioTabPill) {
    const newTab: AmexioTabPill[] = [];
    let index = 0;
    let tabHighlightIndex = 0;

    this.tabCollection.forEach((tab) => {
      tab.active = false;
      if (tab.tabId === tabNode.tabId) {
        tabHighlightIndex = index;
      }
      if (tab.tabId !== tabNode.tabId) {
        newTab.push(tab);
      }
      index++;
    });

    if (tabHighlightIndex === newTab.length) {
      tabHighlightIndex--;
    }
    this.activateTab(newTab[tabHighlightIndex].tabId);
    this.tabCollection = newTab;
    if (this.tabCollection.length === 1) {
    }
  }

  activateTab(tabId: number) {
    this.tabCollection.forEach((tab) => {
      tab.active = false;
      if (tab.tabId === tabId) {
        tab.active = true;
      }
    });
  }
}
