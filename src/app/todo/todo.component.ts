import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITache } from '../model/tache';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  tache: ITache[] = [];
  encoursderelalisation: ITache[] = [];
  fait: ITache[] = [];
  updateIndex!: any;
  isEditEnabled: boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required],
    });
  }

  ajoutTache() {
    this.tache.push({
      description: this.todoForm.value.item,
      fait: false,
    });
    this.todoForm.reset();
  }

  updateTache() {
    this.tache[this.updateIndex].description = this.todoForm.value.item;
    this.tache[this.updateIndex].fait = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }

  onEdit(item: ITache, i: number) {
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  deleteTache(i: number) {
    this.tache.splice(i, 1);
  }

  deleteencoursderelalisationTache(i: number) {
    this.encoursderelalisation.splice(i, 1);
  }

  deletefaitTache(i: number) {
    this.fait.splice(i, 1);
  }

  drop(event: CdkDragDrop<ITache[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
