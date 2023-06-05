import { Component, ViewChild } from '@angular/core';
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

  nodes = [
    {
      label: 'Parent 1',
      selectedType: 'Input',
      substructures: [],
      id: uuid(),
      level: 0,
      parentType: null,
    },
  ];

  options: ITreeOptions = {
    displayField: 'label',
    childrenField: 'substructures',
  };

  onTypeChange(node) {
    console.log(node);
    node.data.substructures = [];
    this.tree.treeModel.update();
  }

  addNode(node) {
    console.log('here');
    const activeNode = node;
    activeNode.data.substructures.push({
      label: '',
      selectedType: '',
      substructures: [],
      level: activeNode.data.level + 1,
      id: uuid(),
      parentType: activeNode.data.selectedType,
    });
    this.tree.treeModel.update();
  }
}
