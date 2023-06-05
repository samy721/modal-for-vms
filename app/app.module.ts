import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { TreeModule } from 'angular-tree-component';
import { MyComponent } from './tree/vms.component';

@NgModule({
  imports: [BrowserModule, FormsModule, TreeModule.forRoot()],
  declarations: [AppComponent, HelloComponent, MyComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
