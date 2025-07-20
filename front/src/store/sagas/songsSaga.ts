import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSong,
  createSongSuccess,
  createSongFailure,
  updateSong,
  updateSongSuccess,
  updateSongFailure,
  deleteSong,
  deleteSongSuccess,
  deleteSongFailure,
  fetchGenres,
  fetchGenresSuccess,
} from '../slices/songsSlice';
import { PaginationParams, CreateSongRequest, UpdateSongRequest } from '@types/index';
import * as api from '@utils/api';

function* fetchSongsSaga(action: PayloadAction<PaginationParams>) {
  try {
    const response = yield call(api.fetchSongs, action.payload);
    yield put(fetchSongsSuccess(response));
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message || 'Failed to fetch songs'));
  }
}

function* createSongSaga(action: PayloadAction<CreateSongRequest>) {
  try {
    const song = yield call(api.createSong, action.payload);
    yield put(createSongSuccess(song));
  } catch (error: any) {
    yield put(createSongFailure(error.message || 'Failed to create song'));
  }
}

function* updateSongSaga(action: PayloadAction<UpdateSongRequest>) {
  try {
    const song = yield call(api.updateSong, action.payload);
    yield put(updateSongSuccess(song));
  } catch (error: any) {
    yield put(updateSongFailure(error.message || 'Failed to update song'));
  }
}

function* deleteSongSaga(action: PayloadAction<string>) {
  try {
    yield call(api.deleteSong, action.payload);
    yield put(deleteSongSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteSongFailure(error.message || 'Failed to delete song'));
  }
}

function* fetchGenresSaga() {
  try {
    const genres = yield call(api.fetchGenres);
    yield put(fetchGenresSuccess(genres));
  } catch (error: any) {
    console.error('Failed to fetch genres:', error);
  }
}

export function* songsSaga() {
  yield takeLatest(fetchSongs.type, fetchSongsSaga);
  yield takeEvery(createSong.type, createSongSaga);
  yield takeEvery(updateSong.type, updateSongSaga);
  yield takeEvery(deleteSong.type, deleteSongSaga);
  yield takeLatest(fetchGenres.type, fetchGenresSaga);
}