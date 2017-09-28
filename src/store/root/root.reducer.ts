import { ActionReducer,Action } from '@ngrx/store';
import { Url, initialUrl } from './root.model';
import { INITIAL_URL } from './root.actions';

export function rootReducer(state: Url = initialUrl, action: Action) {
  switch (action.type) {
    case INITIAL_URL:
      return Object.assign({}, state, {
        baseurl: action.payload
      });
    default:
      return state;
  }
}