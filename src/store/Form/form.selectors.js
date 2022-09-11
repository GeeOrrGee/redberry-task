import { createSelector } from '@reduxjs/toolkit';

export const selectForm = (state) => state.form;
export const selectMainObject = createSelector(
    [selectForm],
    (formSlice) => formSlice.mainObject
);

export const selectSentData = createSelector(
    [selectForm],
    (formSlice) => formSlice.sentData
);
export const selectFormLoading = createSelector(
    [selectForm],
    (formSlice) => formSlice.loadingState
);
