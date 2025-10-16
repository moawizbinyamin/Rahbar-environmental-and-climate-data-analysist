import { AddClimateDataPointData, AddClimateDataPointVariables, GetDisasterEventsByLocationData, GetDisasterEventsByLocationVariables, CreateAlertSubscriptionData, CreateAlertSubscriptionVariables, GetLocationsByNameData, GetLocationsByNameVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useAddClimateDataPoint(options?: useDataConnectMutationOptions<AddClimateDataPointData, FirebaseError, AddClimateDataPointVariables>): UseDataConnectMutationResult<AddClimateDataPointData, AddClimateDataPointVariables>;
export function useAddClimateDataPoint(dc: DataConnect, options?: useDataConnectMutationOptions<AddClimateDataPointData, FirebaseError, AddClimateDataPointVariables>): UseDataConnectMutationResult<AddClimateDataPointData, AddClimateDataPointVariables>;

export function useGetDisasterEventsByLocation(vars: GetDisasterEventsByLocationVariables, options?: useDataConnectQueryOptions<GetDisasterEventsByLocationData>): UseDataConnectQueryResult<GetDisasterEventsByLocationData, GetDisasterEventsByLocationVariables>;
export function useGetDisasterEventsByLocation(dc: DataConnect, vars: GetDisasterEventsByLocationVariables, options?: useDataConnectQueryOptions<GetDisasterEventsByLocationData>): UseDataConnectQueryResult<GetDisasterEventsByLocationData, GetDisasterEventsByLocationVariables>;

export function useCreateAlertSubscription(options?: useDataConnectMutationOptions<CreateAlertSubscriptionData, FirebaseError, CreateAlertSubscriptionVariables>): UseDataConnectMutationResult<CreateAlertSubscriptionData, CreateAlertSubscriptionVariables>;
export function useCreateAlertSubscription(dc: DataConnect, options?: useDataConnectMutationOptions<CreateAlertSubscriptionData, FirebaseError, CreateAlertSubscriptionVariables>): UseDataConnectMutationResult<CreateAlertSubscriptionData, CreateAlertSubscriptionVariables>;

export function useGetLocationsByName(vars: GetLocationsByNameVariables, options?: useDataConnectQueryOptions<GetLocationsByNameData>): UseDataConnectQueryResult<GetLocationsByNameData, GetLocationsByNameVariables>;
export function useGetLocationsByName(dc: DataConnect, vars: GetLocationsByNameVariables, options?: useDataConnectQueryOptions<GetLocationsByNameData>): UseDataConnectQueryResult<GetLocationsByNameData, GetLocationsByNameVariables>;
