import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { State } from '../models/state';
import { StateService } from '../services/state.service';
import { UserService } from '../services/user.service';
import { NgIf } from '@angular/common';
import { User } from '../models/user';

@Component({
  selector: 'app-state-details',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './state-details.component.html',
  styleUrl: './state-details.component.css'
})
export class StateDetailsComponent {
  @Input() state?: State;
  @Output() deselect = new EventEmitter<void>();
  @Output() stateUpdated = new EventEmitter<State>();

  editStateForm: FormGroup | undefined;

  StateID?: String;

  user: User =  {  '_id': '',
  'name': {
   'first_name': '',
   'middle_name':'',
   'last_name': '',
 },
  'email':'@gmail.com',
  'phone_number':'',
  'gender':''
  };
    editState: { user: any; actualState: any; startOnline: any; finishOnline: any; lastConnection: any; } | undefined;
    update: boolean | undefined;


constructor(public stateService: StateService, private formBuilder: FormBuilder, public userService: UserService) {
  this.editStateForm = this.formBuilder.group({
    user: ['', [Validators.required]],
    actualState: ['', [Validators.required]],
    startOnline:['', [Validators.required]],
    finishOnline:['', [Validators.required]],
    lastConnection:['', [Validators.required]]
  });

  // Comprobar si hay un usuario recibido como entrada y actualizar el formulario si es necesario
}


  ngOnInit() {
    if (this.state && this.state._id) {
      this.StateID = this.state._id;
      console.log(this.state._id)

      this.stateService.getState(this.StateID).subscribe(
        (res: any) => {
          this.state = res.data;
        },
        (error) => {
          console.error('Error al obtener el estado:', error);
        }
      );
    }
  }
 
  updateEdit(state: boolean) {
    this.update = state;
    console.log("Cambio modo edición/lectura", this.update);
  }

  updateState(): void {

    const formData = this.editStateForm.value;
    this.editState = {
        user: formData.users,
        actualState: formData.actualState,
        startOnline: formData.startOnline,
        finishOnline: formData.finishOnline,
        lastConnection: formData.lastConnection
    };

    this.stateService.updateState(this.editState).subscribe (editState =>{
      this.state =   {
        user: formData.users,
        actualState: formData.actualState,
        startOnline: formData.startOnline,
        finishOnline: formData.finishOnline,
        lastConnection: formData.lastConnection
    } 
      this.stateUpdated.emit(this.editState);
    });
  } 
}