import { createSelector } from '@reduxjs/toolkit';

export const selectLaptopInfo = (state) => state.form.laptop;

// export const selectLaptopActiveNames = createSelector(
//     [selectLaptopInfo],
//     (laptopInfoSlice) => laptopInfoSlice.activeNames
// );

// export const selectLaptopFormObject = createSelector(
//     [selectLaptopInfo],
//     (laptopInfoSlice) => laptopInfoSlice.laptopFormObject
// );
// export const selectImageInputDragEnter = createSelector(
//     [selectLaptopInfo],
//     (laptopInfoSlice) => laptopInfoSlice.imageInputDragEnter
// );
// export const selectLaptopFormErrors = createSelector(
//     [selectLaptopInfo],
//     (laptopInfoSlice) => laptopInfoSlice.formErrors
// );
// export const selectLaptopFetchedData = createSelector(
//     [selectLaptopInfo],
//     (laptopInfoSlice) => laptopInfoSlice.fetchedData
// );
