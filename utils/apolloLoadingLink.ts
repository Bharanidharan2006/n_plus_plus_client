import { useLoadingStore } from "@/stores/loading.store";
import { ApolloLink, Observable } from "@apollo/client";

// This acts as a middleware and before any request is sent it passes through the middleware and when the response comes back it agains passes
// through this

/*
    Request -> ApolloLink -> HttpLink -> Server -> HttpLink -> ApolloLink -> Response 

*/

let activeRequests = 0;

export const loadingLink = new ApolloLink((operation, forward) => {
  activeRequests++;
  useLoadingStore.getState().setLoading(true);

  return new Observable((observer) => {
    const subscription = forward(operation).subscribe({
      next: (result) => {
        observer.next(result);
      },
      error: (error) => {
        observer.error(error);
      },
      complete: () => {
        observer.complete();
      },
    });

    return () => {
      activeRequests--;

      if (activeRequests === 0) {
        useLoadingStore.getState().setLoading(false);
      }

      subscription.unsubscribe();
    };
  });
});
