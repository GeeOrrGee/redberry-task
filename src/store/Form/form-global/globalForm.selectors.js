import { createSelector } from '@reduxjs/toolkit';

export const selectForm = (state) => state.form;

// wrapper/parent route reducer selectors
export const selectGlobalForm = createSelector(
    [selectForm],
    (formSlice) => formSlice.formGlobalReducer
);
export const selectMainObject = createSelector(
    [selectGlobalForm],
    (globalForm) => globalForm.mainObject
);

export const selectSentData = createSelector(
    [selectGlobalForm],
    (globalForm) => globalForm.sentData
);
export const selectFormLoading = createSelector(
    [selectGlobalForm],
    (globalForm) => globalForm.loadingState
);
