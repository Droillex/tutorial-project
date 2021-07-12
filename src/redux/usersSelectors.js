export const selectUsers = (state) => state.usersPage.users;
export const selectCurrentPage = (state) => state.usersPage.currentPage;
export const selectUsersPerPage = (state) => state.usersPage.usersPerPage;
export const selectUsersCount = (state) => state.usersPage.usersCount;
export const selectIsFetching = (state) => state.usersPage.isFetching;
export const selectDisabledUsers = (state) => state.usersPage.disabledUsers;
