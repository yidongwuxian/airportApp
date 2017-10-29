import { INCREMENT, DECREMENT } from './counter.mutationtype';
export function AduCounterReducer(state, action) {
    if (state === void 0) { state = 1; }
    switch (action.type) {
        case INCREMENT:
            return state + 1;
        case DECREMENT:
            return state - 1;
        default:
            return state;
    }
}
export function ChdCounterReducer(state, action) {
    if (state === void 0) { state = 0; }
    switch (action.type) {
        case INCREMENT:
            return state + 1;
        case DECREMENT:
            return state - 1;
        default:
            return state;
    }
}
//# sourceMappingURL=counter.reducer.js.map