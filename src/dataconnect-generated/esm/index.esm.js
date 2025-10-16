import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'alphaearth',
  location: 'us-east4'
};

export const addClimateDataPointRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddClimateDataPoint', inputVars);
}
addClimateDataPointRef.operationName = 'AddClimateDataPoint';

export function addClimateDataPoint(dcOrVars, vars) {
  return executeMutation(addClimateDataPointRef(dcOrVars, vars));
}

export const getDisasterEventsByLocationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDisasterEventsByLocation', inputVars);
}
getDisasterEventsByLocationRef.operationName = 'GetDisasterEventsByLocation';

export function getDisasterEventsByLocation(dcOrVars, vars) {
  return executeQuery(getDisasterEventsByLocationRef(dcOrVars, vars));
}

export const createAlertSubscriptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAlertSubscription', inputVars);
}
createAlertSubscriptionRef.operationName = 'CreateAlertSubscription';

export function createAlertSubscription(dcOrVars, vars) {
  return executeMutation(createAlertSubscriptionRef(dcOrVars, vars));
}

export const getLocationsByNameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLocationsByName', inputVars);
}
getLocationsByNameRef.operationName = 'GetLocationsByName';

export function getLocationsByName(dcOrVars, vars) {
  return executeQuery(getLocationsByNameRef(dcOrVars, vars));
}

