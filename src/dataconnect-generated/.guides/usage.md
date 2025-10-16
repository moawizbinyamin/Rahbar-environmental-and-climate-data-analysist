# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useAddClimateDataPoint, useGetDisasterEventsByLocation, useCreateAlertSubscription, useGetLocationsByName } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useAddClimateDataPoint(addClimateDataPointVars);

const { data, isPending, isSuccess, isError, error } = useGetDisasterEventsByLocation(getDisasterEventsByLocationVars);

const { data, isPending, isSuccess, isError, error } = useCreateAlertSubscription(createAlertSubscriptionVars);

const { data, isPending, isSuccess, isError, error } = useGetLocationsByName(getLocationsByNameVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { addClimateDataPoint, getDisasterEventsByLocation, createAlertSubscription, getLocationsByName } from '@dataconnect/generated';


// Operation AddClimateDataPoint:  For variables, look at type AddClimateDataPointVars in ../index.d.ts
const { data } = await AddClimateDataPoint(dataConnect, addClimateDataPointVars);

// Operation GetDisasterEventsByLocation:  For variables, look at type GetDisasterEventsByLocationVars in ../index.d.ts
const { data } = await GetDisasterEventsByLocation(dataConnect, getDisasterEventsByLocationVars);

// Operation CreateAlertSubscription:  For variables, look at type CreateAlertSubscriptionVars in ../index.d.ts
const { data } = await CreateAlertSubscription(dataConnect, createAlertSubscriptionVars);

// Operation GetLocationsByName:  For variables, look at type GetLocationsByNameVars in ../index.d.ts
const { data } = await GetLocationsByName(dataConnect, getLocationsByNameVars);


```