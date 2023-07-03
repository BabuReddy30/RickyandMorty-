import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchCharactersSuccess,
  fetchCharactersFailure,
  fetchCharacters,
} from './charactersSlice';
import {
  fetchCharacterByIdSuccess,
  fetchCharacterByIdFailure,
  fetchCharacterById,
} from './characterDetailSlice';

function* fetchCharactersAsync(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, 'https://rickandmortyapi.com/api/character');
    yield put(fetchCharactersSuccess(response.data.results));
  } catch (error: any) {
    yield put(fetchCharactersFailure(error.message));
  }
}

function* fetchCharacterByIdAsync(action: { type: string; payload: number }): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `https://rickandmortyapi.com/api/character/${action.payload}`);
    yield put(fetchCharacterByIdSuccess(response.data));
    console.log(response.data);
  } catch (error: any) {
    yield put(fetchCharacterByIdFailure(error.message));
  }
}

export function* watchFetchCharacters(): Generator<any, void, any> {
  yield takeLatest(fetchCharacters.type, fetchCharactersAsync);
}

export function* watchFetchCharacterById(): Generator<any, void, any> {
  yield takeLatest(fetchCharacterById.type, fetchCharacterByIdAsync);
}
