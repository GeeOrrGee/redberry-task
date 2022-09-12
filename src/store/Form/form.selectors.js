import { createSelector } from '@reduxjs/toolkit';

export const selectForm = (state) => state.form;

// wrapper/parent route reducer selectors
export const selectGlobalForm = createSelector(
    [selectForm],
    (formSlice) => formSlice.formGlobalReducer
);
export const selectMainObject = createSelector(
    [selectGlobalForm],
    (globalFormSlice) => globalFormSlice.mainObject
);

export const selectSentData = createSelector(
    [selectGlobalForm],
    (globalFormSlice) => globalFormSlice.sentData
);
export const selectFormLoading = createSelector(
    [selectGlobalForm],
    (globalFormSlice) => globalFormSlice.loadingState
);
