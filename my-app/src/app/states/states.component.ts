import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CommonModule, NgIf, UpperCasePipe} from '@angular/common';
import { State } from '../models/state';
import { User } from '../models/user';
import { StateService } from '../services/state.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [FormsModule, NgIf, UpperCasePipe, CommonModule, ReactiveFormsModule],
  templateUrl: './states.component.html',
  styleUrl: './states.component.css'
})
export class StatesComponent {
  @Input() user?: String;
  @Output() statesUpdate = new EventEmitter<void>();

  postStateForm: FormGroup;

  page = 0;
  states: State[] = [];
  test?: String;
  previous = "<";
  next = ">";
  first_page = true;
  last_page = false;

  constructor( public stateService: StateService, private formBuilder: FormBuilder){
    this.postStateForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      actualState: ['', [Validators.required]],
      startOnline: ['', [Validators.required]],
      finishOnline: ['', [Validators.required]],
      lastConnection: ['', [Validators.required]]
    });
  }

  async postState(): Promise<void>{
    if (this.postStateForm.valid) {
      await this.stateService.postState(this.postStateForm.value).subscribe((res: any) => {
        this.states.unshift(res.comment);
        this.postStateForm.reset();
        this.statesUpdate.emit();
      });
    } else {
      console.error("El formulario no es válido. No se puede agregar el usuario.");
    }
  } 


  deleteState(state: State): void{
    this.stateService.deleteState(state._id!).subscribe (() =>{
      this.statesUpdate.emit();
    })
    state.actualState = "DELETED";
  }
}