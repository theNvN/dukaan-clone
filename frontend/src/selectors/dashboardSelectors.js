import { createSelector } from "reselect";

const tabSelector = (state) => state.dashboard.tabValue;
const selectedShopSelector = (state) => state.dashboard.selectedShop;
const shopsListSelector = (state) => state.dashboard.shopsList;
const errorSelector = (state) => state.dashboard.error;
const infoSelector = (state) => state.dashboard.info;

export const tabValue = createSelector([tabSelector], (tabValue) => tabValue);
export const selectedShop = createSelector(
  [selectedShopSelector],
  (selectedShop) => selectedShop
);
export const shopsList = createSelector([shopsListSelector], (shops) => shops);

export const errorMessage = createSelector([errorSelector], (msg) => msg);
export const infoMessage = createSelector([infoSelector], (msg) => msg);
