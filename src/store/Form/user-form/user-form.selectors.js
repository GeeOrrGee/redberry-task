import { createSelector } from '@reduxjs/toolkit';

export const selectUserInfo = (state) => {
    return state.form.user;
};

export const selectActiveTeamId = createSelector(
    [selectUserInfo],
    (userInfoSlice) => userInfoSlice.activeTeamId
);
export const selectFetchedData = createSelector(
    [selectUserInfo],
    (userInfoSlice) => userInfoSlice.fetchedData
);
