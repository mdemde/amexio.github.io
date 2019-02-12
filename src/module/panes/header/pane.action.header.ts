/*
 * Copyright [2019] [Metamagic]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by pratik on 18/12/17.
 */

import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';

@Component({
  selector: 'amexio-header', template: `
    <ng-content></ng-content>
   <div>
      <amexio-c-icon *ngIf="(isFullWindow && maximize )" [key]="'window_maximize'" (onClick)="sizeChange()"></amexio-c-icon>
      <amexio-c-icon *ngIf="(!isFullWindow && maximize )" [key]="'window_restore'" (click)="sizeChange()"></amexio-c-icon>
      &nbsp;
      <amexio-c-icon *ngIf="closeable" [key]="'window_close'" (onClick)="onCloseClick()"></amexio-c-icon>
    </div>
  `,
})

export class AmexioHeaderComponent implements OnInit {

  @HostBinding('attr.class') className = 'modal-window-header';

  @HostBinding('style.justify-content') jstyfy = 'space-between';

  @HostBinding('style.background') private background = '';

  @HostBinding('style.color') color = '';
  
  @Input() padding: string;

  closeable = false;

  maximize = false;

  isFullWindow = false;

  closeableBehaiour = new BehaviorSubject(false);

  maximizeBehaiour = new BehaviorSubject(false);

  constructor() {
  }

  ngOnInit() {

  }

  setMaximizeData(maximize: boolean, isFullWindow: boolean) {
    this.maximize = maximize;
    this.isFullWindow = isFullWindow;
    this.maximizeBehaiour.next(this.isFullWindow);
  }

  setMaterialDesignStatus(materialDesign: boolean) {
    if (materialDesign) {
      this.background = 'white';
      this.color = 'black';
    }
  }

  sizeChange() {
    this.isFullWindow = !this.isFullWindow;
    this.maximizeBehaiour.next(this.isFullWindow);
  }

  onCloseClick() {
    this.closeableBehaiour.next(false);
  }
}
