import { wrapPromiseWithState } from '../../../utilities';

// TODO: Replace the use of this with React's use once its available. For now,
// this mimics its functionality (minus support for context) by adding
// properties to the promise and reading them synchronously. This is named with
// two underscores to allow this hook to evade typical rules of hooks (i.e. its
// can be used conditionally)
export function __use<TValue>(promise: Promise<TValue>) {
  const statefulPromise = wrapPromiseWithState(promise);

  switch (statefulPromise.status) {
    case 'pending':
      console.log('suspend!');
      throw statefulPromise;
    case 'rejected':
      throw statefulPromise.reason;
    case 'fulfilled':
      return statefulPromise.value;
  }
}
