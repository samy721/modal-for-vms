import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ITreeOptions, TreeComponent } from 'angular-tree-component';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-my-component',
  templateUrl: './vms.component.html',
  styleUrls: ['./vms.component.css'],
})
export class MyComponent {
  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  showModalForFile: boolean = false;

  @Input() inputData: boolean;
  @Output() outputData: EventEmitter<any> = new EventEmitter<any>();
  @Output() outputResult: EventEmitter<any> = new EventEmitter<any>();

  ngOnChanges() {
    if (this.inputData) {
      const result = this.tree.treeModel.nodes[0];
      this.outputResult.emit(result);
    }
  }

  nodes = [
    {
      label: '',
      selectedType: 'input',
      substructures: [],
      id: uuid(),
      level: 0,
      parentType: null,
      uploadFile: false,
      mandatoryField: false,
    },
  ];
  labelMap: Object = {};

  options: ITreeOptions = {
    displayField: 'label',
    childrenField: 'substructures',
  };

  node: any;

  onTypeChange(node) {
    console.log(node);
    node.data.substructures = [];
    this.tree.treeModel.update();
  }

  addNode(node) {
    console.log('here');
    const activeNode = this.tree.treeModel.getNodeById(node.data.id);
    activeNode.data.substructures.push({
      label: '',
      selectedType: 'input',
      substructures: [],
      level: activeNode.data.level + 1,
      id: uuid(),
      parentType: activeNode.data.selectedType,
      uploadFile: false,
      mandatoryField: false,
    });
    this.tree.treeModel.update();
    this.tree.treeModel.getNodeById(node.data.id).expand();
    this.outputData.emit({ emptyLabel: true });
  }

  changeNodeForModal(node) {
    this.node = node;
    this.showModalForFile = true;
  }

  onNameChange(data) {
    this.labelMap[data.id] = data.label;
    this.checkLabels();
  }

  checkLabels() {
    let anyEmptyLabel = false;
    for (let key of Object.keys(this.labelMap)) {
      if (this.labelMap[key].trim() == '') {
        anyEmptyLabel = true;
        break;
      }
    }
    this.outputData.emit({ emptyLabel: anyEmptyLabel });
  }
}
