# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetDisasterEventsByLocation*](#getdisastereventsbylocation)
  - [*GetLocationsByName*](#getlocationsbyname)
- [**Mutations**](#mutations)
  - [*AddClimateDataPoint*](#addclimatedatapoint)
  - [*CreateAlertSubscription*](#createalertsubscription)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetDisasterEventsByLocation
You can execute the `GetDisasterEventsByLocation` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getDisasterEventsByLocation(vars: GetDisasterEventsByLocationVariables): QueryPromise<GetDisasterEventsByLocationData, GetDisasterEventsByLocationVariables>;

interface GetDisasterEventsByLocationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDisasterEventsByLocationVariables): QueryRef<GetDisasterEventsByLocationData, GetDisasterEventsByLocationVariables>;
}
export const getDisasterEventsByLocationRef: GetDisasterEventsByLocationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDisasterEventsByLocation(dc: DataConnect, vars: GetDisasterEventsByLocationVariables): QueryPromise<GetDisasterEventsByLocationData, GetDisasterEventsByLocationVariables>;

interface GetDisasterEventsByLocationRef {
  ...
  (dc: DataConnect, vars: GetDisasterEventsByLocationVariables): QueryRef<GetDisasterEventsByLocationData, GetDisasterEventsByLocationVariables>;
}
export const getDisasterEventsByLocationRef: GetDisasterEventsByLocationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDisasterEventsByLocationRef:
```typescript
const name = getDisasterEventsByLocationRef.operationName;
console.log(name);
```

### Variables
The `GetDisasterEventsByLocation` query requires an argument of type `GetDisasterEventsByLocationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetDisasterEventsByLocationVariables {
  locationId: UUIDString;
}
```
### Return Type
Recall that executing the `GetDisasterEventsByLocation` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDisasterEventsByLocationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetDisasterEventsByLocation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDisasterEventsByLocation, GetDisasterEventsByLocationVariables } from '@dataconnect/generated';

// The `GetDisasterEventsByLocation` query requires an argument of type `GetDisasterEventsByLocationVariables`:
const getDisasterEventsByLocationVars: GetDisasterEventsByLocationVariables = {
  locationId: ..., 
};

// Call the `getDisasterEventsByLocation()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDisasterEventsByLocation(getDisasterEventsByLocationVars);
// Variables can be defined inline as well.
const { data } = await getDisasterEventsByLocation({ locationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDisasterEventsByLocation(dataConnect, getDisasterEventsByLocationVars);

console.log(data.disasterEvents);

// Or, you can use the `Promise` API.
getDisasterEventsByLocation(getDisasterEventsByLocationVars).then((response) => {
  const data = response.data;
  console.log(data.disasterEvents);
});
```

### Using `GetDisasterEventsByLocation`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDisasterEventsByLocationRef, GetDisasterEventsByLocationVariables } from '@dataconnect/generated';

// The `GetDisasterEventsByLocation` query requires an argument of type `GetDisasterEventsByLocationVariables`:
const getDisasterEventsByLocationVars: GetDisasterEventsByLocationVariables = {
  locationId: ..., 
};

// Call the `getDisasterEventsByLocationRef()` function to get a reference to the query.
const ref = getDisasterEventsByLocationRef(getDisasterEventsByLocationVars);
// Variables can be defined inline as well.
const ref = getDisasterEventsByLocationRef({ locationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDisasterEventsByLocationRef(dataConnect, getDisasterEventsByLocationVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.disasterEvents);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.disasterEvents);
});
```

## GetLocationsByName
You can execute the `GetLocationsByName` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getLocationsByName(vars: GetLocationsByNameVariables): QueryPromise<GetLocationsByNameData, GetLocationsByNameVariables>;

interface GetLocationsByNameRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLocationsByNameVariables): QueryRef<GetLocationsByNameData, GetLocationsByNameVariables>;
}
export const getLocationsByNameRef: GetLocationsByNameRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLocationsByName(dc: DataConnect, vars: GetLocationsByNameVariables): QueryPromise<GetLocationsByNameData, GetLocationsByNameVariables>;

interface GetLocationsByNameRef {
  ...
  (dc: DataConnect, vars: GetLocationsByNameVariables): QueryRef<GetLocationsByNameData, GetLocationsByNameVariables>;
}
export const getLocationsByNameRef: GetLocationsByNameRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLocationsByNameRef:
```typescript
const name = getLocationsByNameRef.operationName;
console.log(name);
```

### Variables
The `GetLocationsByName` query requires an argument of type `GetLocationsByNameVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetLocationsByNameVariables {
  name: string;
}
```
### Return Type
Recall that executing the `GetLocationsByName` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLocationsByNameData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetLocationsByNameData {
  locations: ({
    id: UUIDString;
    name: string;
    latitude: number;
    longitude: number;
    country?: string | null;
  } & Location_Key)[];
}
```
### Using `GetLocationsByName`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLocationsByName, GetLocationsByNameVariables } from '@dataconnect/generated';

// The `GetLocationsByName` query requires an argument of type `GetLocationsByNameVariables`:
const getLocationsByNameVars: GetLocationsByNameVariables = {
  name: ..., 
};

// Call the `getLocationsByName()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLocationsByName(getLocationsByNameVars);
// Variables can be defined inline as well.
const { data } = await getLocationsByName({ name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLocationsByName(dataConnect, getLocationsByNameVars);

console.log(data.locations);

// Or, you can use the `Promise` API.
getLocationsByName(getLocationsByNameVars).then((response) => {
  const data = response.data;
  console.log(data.locations);
});
```

### Using `GetLocationsByName`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLocationsByNameRef, GetLocationsByNameVariables } from '@dataconnect/generated';

// The `GetLocationsByName` query requires an argument of type `GetLocationsByNameVariables`:
const getLocationsByNameVars: GetLocationsByNameVariables = {
  name: ..., 
};

// Call the `getLocationsByNameRef()` function to get a reference to the query.
const ref = getLocationsByNameRef(getLocationsByNameVars);
// Variables can be defined inline as well.
const ref = getLocationsByNameRef({ name: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLocationsByNameRef(dataConnect, getLocationsByNameVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.locations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.locations);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## AddClimateDataPoint
You can execute the `AddClimateDataPoint` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addClimateDataPoint(vars: AddClimateDataPointVariables): MutationPromise<AddClimateDataPointData, AddClimateDataPointVariables>;

interface AddClimateDataPointRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddClimateDataPointVariables): MutationRef<AddClimateDataPointData, AddClimateDataPointVariables>;
}
export const addClimateDataPointRef: AddClimateDataPointRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addClimateDataPoint(dc: DataConnect, vars: AddClimateDataPointVariables): MutationPromise<AddClimateDataPointData, AddClimateDataPointVariables>;

interface AddClimateDataPointRef {
  ...
  (dc: DataConnect, vars: AddClimateDataPointVariables): MutationRef<AddClimateDataPointData, AddClimateDataPointVariables>;
}
export const addClimateDataPointRef: AddClimateDataPointRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addClimateDataPointRef:
```typescript
const name = addClimateDataPointRef.operationName;
console.log(name);
```

### Variables
The `AddClimateDataPoint` mutation requires an argument of type `AddClimateDataPointVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `AddClimateDataPoint` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddClimateDataPointData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddClimateDataPointData {
  climateDataPoint_insert: ClimateDataPoint_Key;
}
```
### Using `AddClimateDataPoint`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addClimateDataPoint, AddClimateDataPointVariables } from '@dataconnect/generated';

// The `AddClimateDataPoint` mutation requires an argument of type `AddClimateDataPointVariables`:
const addClimateDataPointVars: AddClimateDataPointVariables = {
  locationId: ..., // optional
  confidenceScore: ..., // optional
  dataType: ..., 
  predictionModel: ..., // optional
  resolution: ..., // optional
  timestamp: ..., 
  unit: ..., 
  value: ..., 
};

// Call the `addClimateDataPoint()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addClimateDataPoint(addClimateDataPointVars);
// Variables can be defined inline as well.
const { data } = await addClimateDataPoint({ locationId: ..., confidenceScore: ..., dataType: ..., predictionModel: ..., resolution: ..., timestamp: ..., unit: ..., value: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addClimateDataPoint(dataConnect, addClimateDataPointVars);

console.log(data.climateDataPoint_insert);

// Or, you can use the `Promise` API.
addClimateDataPoint(addClimateDataPointVars).then((response) => {
  const data = response.data;
  console.log(data.climateDataPoint_insert);
});
```

### Using `AddClimateDataPoint`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addClimateDataPointRef, AddClimateDataPointVariables } from '@dataconnect/generated';

// The `AddClimateDataPoint` mutation requires an argument of type `AddClimateDataPointVariables`:
const addClimateDataPointVars: AddClimateDataPointVariables = {
  locationId: ..., // optional
  confidenceScore: ..., // optional
  dataType: ..., 
  predictionModel: ..., // optional
  resolution: ..., // optional
  timestamp: ..., 
  unit: ..., 
  value: ..., 
};

// Call the `addClimateDataPointRef()` function to get a reference to the mutation.
const ref = addClimateDataPointRef(addClimateDataPointVars);
// Variables can be defined inline as well.
const ref = addClimateDataPointRef({ locationId: ..., confidenceScore: ..., dataType: ..., predictionModel: ..., resolution: ..., timestamp: ..., unit: ..., value: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addClimateDataPointRef(dataConnect, addClimateDataPointVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.climateDataPoint_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.climateDataPoint_insert);
});
```

## CreateAlertSubscription
You can execute the `CreateAlertSubscription` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createAlertSubscription(vars: CreateAlertSubscriptionVariables): MutationPromise<CreateAlertSubscriptionData, CreateAlertSubscriptionVariables>;

interface CreateAlertSubscriptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAlertSubscriptionVariables): MutationRef<CreateAlertSubscriptionData, CreateAlertSubscriptionVariables>;
}
export const createAlertSubscriptionRef: CreateAlertSubscriptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAlertSubscription(dc: DataConnect, vars: CreateAlertSubscriptionVariables): MutationPromise<CreateAlertSubscriptionData, CreateAlertSubscriptionVariables>;

interface CreateAlertSubscriptionRef {
  ...
  (dc: DataConnect, vars: CreateAlertSubscriptionVariables): MutationRef<CreateAlertSubscriptionData, CreateAlertSubscriptionVariables>;
}
export const createAlertSubscriptionRef: CreateAlertSubscriptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAlertSubscriptionRef:
```typescript
const name = createAlertSubscriptionRef.operationName;
console.log(name);
```

### Variables
The `CreateAlertSubscription` mutation requires an argument of type `CreateAlertSubscriptionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateAlertSubscription` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAlertSubscriptionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAlertSubscriptionData {
  alertSubscription_insert: AlertSubscription_Key;
}
```
### Using `CreateAlertSubscription`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAlertSubscription, CreateAlertSubscriptionVariables } from '@dataconnect/generated';

// The `CreateAlertSubscription` mutation requires an argument of type `CreateAlertSubscriptionVariables`:
const createAlertSubscriptionVars: CreateAlertSubscriptionVariables = {
  userId: ..., 
  locationId: ..., 
  createdAt: ..., 
  deliveryMethod: ..., // optional
  isActive: ..., 
  recurrence: ..., // optional
  threshold: ..., 
  type: ..., 
};

// Call the `createAlertSubscription()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAlertSubscription(createAlertSubscriptionVars);
// Variables can be defined inline as well.
const { data } = await createAlertSubscription({ userId: ..., locationId: ..., createdAt: ..., deliveryMethod: ..., isActive: ..., recurrence: ..., threshold: ..., type: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAlertSubscription(dataConnect, createAlertSubscriptionVars);

console.log(data.alertSubscription_insert);

// Or, you can use the `Promise` API.
createAlertSubscription(createAlertSubscriptionVars).then((response) => {
  const data = response.data;
  console.log(data.alertSubscription_insert);
});
```

### Using `CreateAlertSubscription`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAlertSubscriptionRef, CreateAlertSubscriptionVariables } from '@dataconnect/generated';

// The `CreateAlertSubscription` mutation requires an argument of type `CreateAlertSubscriptionVariables`:
const createAlertSubscriptionVars: CreateAlertSubscriptionVariables = {
  userId: ..., 
  locationId: ..., 
  createdAt: ..., 
  deliveryMethod: ..., // optional
  isActive: ..., 
  recurrence: ..., // optional
  threshold: ..., 
  type: ..., 
};

// Call the `createAlertSubscriptionRef()` function to get a reference to the mutation.
const ref = createAlertSubscriptionRef(createAlertSubscriptionVars);
// Variables can be defined inline as well.
const ref = createAlertSubscriptionRef({ userId: ..., locationId: ..., createdAt: ..., deliveryMethod: ..., isActive: ..., recurrence: ..., threshold: ..., type: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAlertSubscriptionRef(dataConnect, createAlertSubscriptionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.alertSubscription_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.alertSubscription_insert);
});
```

