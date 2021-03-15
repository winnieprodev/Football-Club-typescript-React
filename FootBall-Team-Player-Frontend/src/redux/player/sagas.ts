import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { getParams, URL } from 'src/utils/api';
import {
  PlayerActions as ActionType,
  getPlayersSuccess,
  getPlayersError,
} from './actions';
import { PlayerTypes } from './types';

function* handleGetPlayers({ payload }: ActionType) {
  try {
    const { data } = yield call(
      axios.request,
      getParams(URL.GET_PLAYERS, 'POST', payload)
    );
    yield put(getPlayersSuccess(data));
  } catch (err) {
    yield put(getPlayersError(err));
  }
}

export default function* playerSaga() {
  yield takeLatest(PlayerTypes.GET_PLAYERS_REQUEST, handleGetPlayers);
}
