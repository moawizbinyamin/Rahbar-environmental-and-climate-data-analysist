const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'alphaearth',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const addClimateDataPointRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddClimateDataPoint', inputVars);
}
addClimateDataPointRef.operationName = 'AddClimateDataPoint';
exports.addClimateDataPointRef = addClimateDataPointRef;

exports.addClimateDataPoint = function addClimateDataPoint(dcOrVars, vars) {
  return executeMutation(addClimateDataPointRef(dcOrVars, vars));
};

const getDisasterEventsByLocationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDisasterEventsByLocation', inputVars);
}
getDisasterEventsByLocationRef.operationName = 'GetDisasterEventsByLocation';
exports.getDisasterEventsByLocationRef = getDisasterEventsByLocationRef;

exports.getDisasterEventsByLocation = function getDisasterEventsByLocation(dcOrVars, vars) {
  return executeQuery(getDisasterEventsByLocationRef(dcOrVars, vars));
};

const createAlertSubscriptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAlertSubscription', inputVars);
}
createAlertSubscriptionRef.operationName = 'CreateAlertSubscription';
exports.createAlertSubscriptionRef = createAlertSubscriptionRef;

exports.createAlertSubscription = function createAlertSubscription(dcOrVars, vars) {
  return executeMutation(createAlertSubscriptionRef(dcOrVars, vars));
};

const getLocationsByNameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLocationsByName', inputVars);
}
getLocationsByNameRef.operationName = 'GetLocationsByName';
exports.getLocationsByNameRef = getLocationsByNameRef;

exports.getLocationsByName = function getLocationsByName(dcOrVars, vars) {
  return executeQuery(getLocationsByNameRef(dcOrVars, vars));
};
