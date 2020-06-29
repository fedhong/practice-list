import { delay, put, takeEvery } from 'redux-saga/effects';

export function* incrementAsync() {
    yield delay(2000);
    yield put({ type: 'INCREMENT' });
}

export function* decrementAsync() {
    yield delay(2000);
    yield put({ type: 'DECREMENT' });
}

export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

export function* watchDecrementAsync() {
    yield takeEvery('DECREMENT_ASYNC', decrementAsync);
}