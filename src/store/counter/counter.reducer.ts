import { ActionReducer,Action } from '@ngrx/store';
import { INCREMENT,DECREMENT } from './counter.mutationtype';

export function AduCounterReducer(state: number = 1, action: Action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;  
    default:
      return state;
  }
}

export function ChdCounterReducer(state: number = 0, action: Action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;  
    default:
      return state;
  }
}