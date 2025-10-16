import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddClimateDataPointData {
  climateDataPoint_insert: ClimateDataPoint_Key;
}

export interface AddClimateDataPointVariables {
  locationId?: UUIDString | null;
  confidenceScore?: number | null;
  dataType: string;
  predictionModel?: string | null;
  resolution?: string | null;
  timestamp: TimestampString;
  unit: string;
  value: number;
}

export interface AlertSubscription_Key {
  id: UUIDString;
  __typename?: 'AlertSubscription_Key';
}

export interface ClimateDataPoint_Key {
  id: UUIDString;
  __typename?: 'ClimateDataPoint_Key';
}

export interface CreateAlertSubscriptionData {
  alertSubscription_insert: AlertSubscription_Key;
}

export interface CreateAlertSubscriptionVariables {
  userId: UUIDString;
  locationId: UUIDString;
  createdAt: TimestampString;
  deliveryMethod?: string | null;
  isActive: boolean;
  recurrence?: string | null;
  threshold: string;
  type: string;
}

export interface DisasterEvent_Key {
  id: UUIDString;
  __typename?: 'DisasterEvent_Key';
}

export interface GetDisasterEventsByLocationData {
  disasterEvents: ({
    id: UUIDString;
    name: string;
    type: string;
    startTime: TimestampString;
    endTime?: TimestampString | null;
    severity?: string | null;
  } & DisasterEvent_Key)[];
}

export interface GetDisasterEventsByLocationVariables {
  locationId: UUIDString;
}

export interface GetLocationsByNameData {
  locations: ({
    id: UUIDString;
    name: string;
    latitude: number;
    longitude: number;
    country?: string | null;
  } & Location_Key)[];
}

export interface GetLocationsByNameVariables {
  name: string;
}

export interface Location_Key {
  id: UUIDString;
  __typename?: 'Location_Key';
}

export interface QueryLog_Key {
  id: UUIDString;
  __typename?: 'QueryLog_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface AddClimateDataPointRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddClimateDataPointVariables): MutationRef<AddClimateDataPointData, AddClimateDataPointVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddClimateDataPointVariables): MutationRef<AddClimateDataPointData, AddClimateDataPointVariables>;
  operationName: string;
}
export const addClimateDataPointRef: AddClimateDataPointRef;

export function addClimateDataPoint(vars: AddClimateDataPointVariables): MutationPromise<AddClimateDataPointData, AddClimateDataPointVariables>;
export function addClimateDataPoint(dc: DataConnect, vars: AddClimateDataPointVariables): MutationPromise<AddClimateDataPointData, AddClimateDataPointVariables>;

interface GetDisasterEventsByLocationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDisasterEventsByLocationVariables): QueryRef<GetDisasterEventsByLocationData, GetDisasterEventsByLocationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetDisasterEventsByLocationVariables): QueryRef<GetDisasterEventsByLocationData, GetDisasterEventsByLocationVariables>;
  operationName: string;
}
export const getDisasterEventsByLocationRef: GetDisasterEventsByLocationRef;

export function getDisasterEventsByLocation(vars: GetDisasterEventsByLocationVariables): QueryPromise<GetDisasterEventsByLocationData, GetDisasterEventsByLocationVariables>;
export function getDisasterEventsByLocation(dc: DataConnect, vars: GetDisasterEventsByLocationVariables): QueryPromise<GetDisasterEventsByLocationData, GetDisasterEventsByLocationVariables>;

interface CreateAlertSubscriptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAlertSubscriptionVariables): MutationRef<CreateAlertSubscriptionData, CreateAlertSubscriptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAlertSubscriptionVariables): MutationRef<CreateAlertSubscriptionData, CreateAlertSubscriptionVariables>;
  operationName: string;
}
export const createAlertSubscriptionRef: CreateAlertSubscriptionRef;

export function createAlertSubscription(vars: CreateAlertSubscriptionVariables): MutationPromise<CreateAlertSubscriptionData, CreateAlertSubscriptionVariables>;
export function createAlertSubscription(dc: DataConnect, vars: CreateAlertSubscriptionVariables): MutationPromise<CreateAlertSubscriptionData, CreateAlertSubscriptionVariables>;

interface GetLocationsByNameRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLocationsByNameVariables): QueryRef<GetLocationsByNameData, GetLocationsByNameVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetLocationsByNameVariables): QueryRef<GetLocationsByNameData, GetLocationsByNameVariables>;
  operationName: string;
}
export const getLocationsByNameRef: GetLocationsByNameRef;

export function getLocationsByName(vars: GetLocationsByNameVariables): QueryPromise<GetLocationsByNameData, GetLocationsByNameVariables>;
export function getLocationsByName(dc: DataConnect, vars: GetLocationsByNameVariables): QueryPromise<GetLocationsByNameData, GetLocationsByNameVariables>;

