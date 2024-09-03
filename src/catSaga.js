import { call, put, takeEvery } from 'redux-saga/effects';
import { getCatsSuccess, getCatsFailure } from './catState';

function* workGetCatsFetch() {
  try {
    const cats = yield call(() => fetch('https://api.thecatapi.com/v1/breeds'));
    const formatedCats = yield cats.json();
    const formatedCatsShortened = yield formatedCats.slice(0, 20);
    yield put(getCatsSuccess(formatedCatsShortened));
  } catch (error) {
    yield put(getCatsFailure());
  }
}

export default function* catSaga() {
  yield takeEvery('cats/getCatsFetch', workGetCatsFetch);
}