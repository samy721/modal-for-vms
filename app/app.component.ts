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
  formElementName: any;
  selectedType: any;
  configuration: any;
  options: any;
  isFileUploadRequired: any;
  isFormElementMandatory: any;
  currentSection: any;

  handleOutputData(data: any) {
    // Handle the data received from the child component
    this.disableAddButton = !data.emptyLabel; // Enable the button after receiving data
  }

  handleOutputResult(data: any) {
    // Handle the data received from the child component
    this.createMainForm(data); // Enable the button after receiving data
  }

  onAddClicked() {
    this.inputdata = true;
  }

  createMainForm(json) {
    this.formElementName = json.label;
    this.selectedType = json.selectedType;
    this.options = json.substructures.map((e) => e.label);
    this.isFileUploadRequired = json.uploadFile;
    this.isFormElementMandatory = json.mandatoryField;
    this.addFormElement()
      .then((formElementId) => {
        if (json.substructures.length) {
          this.createSubForm(json.substructures, formElementId);
        }
      })
      .catch();
  }

  createSubForm(list: any, formElementId: any) {
    list.forEach((childOption) => {
      if (childOption.substructures.length) {
        let reqField = {
          entityId: this.currentSection.onboardTemplateSectionId,
          entityType: 'SUB_FORM',
          condition: {
            formElementId: formElementId,
            value: childOption.label,
          },
        };
        this.addSubForm(reqField).then((formId) => {
          this.createChildForms(childOption.substructures, formId);
        });
      }
    });
  }

  addSubForm(reqField: {
    entityId: any;
    entityType: string;
    condition: { formElementId: any; value: any };
  }) {}
  createChildForms(list: any, formId: any) {
    list.forEach((json) => {
      this.formElementName = json.label;
      this.selectedType = json.selectedType;
      this.options = json.substructures.map((e) => e.label);
      this.isFileUploadRequired = json.uploadFile;
      this.isFormElementMandatory = json.mandatoryField;
      this.addFormElement(formId);
    });
  }

  addFormElement(formId = false): Promise<void> {}
}
