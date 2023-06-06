import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular 5';
  disableAddButton: boolean = false;
  inputdata: boolean = false;

  handleOutputData(data: any) {
    // Handle the data received from the child component
    this.disableAddButton = !data.emptyLabel; // Enable the button after receiving data
  }

  handleOutputResult(data: any) {
    // Handle the data received from the child component
    console.log(data); // Enable the button after receiving data
  }
  onAddClicked() {
    this.inputdata = true;
  }
}
