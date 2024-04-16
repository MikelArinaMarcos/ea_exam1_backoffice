import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from '../models/state';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http:HttpClient) { }

  postState(newState: State){
    return this.http.post<void>('http://127.0.0.1:3000/state', newState);
  }


  getState(stateID: String) {
    return this.http.get<State>('http://127.0.0.1:3000/state/' + stateID);
  }

  deleteState(stateID: String) {
    return this.http.delete<void>('http://127.0.0.1:3000/state/' + stateID);
  }

  updateState(editState : State) {
    return this.http.put('http://127.0.0.1:3000/state/'+ editState._id, editState);
  }

}
