import { Actions } from '@twilio/flex-ui';

import { checkInputDevice, handleInputDeviceError } from '../helpers';

export const createListeners = () => {
  Actions.addListener('beforeSetActivity', async (payload, abortOriginal) => {
    //console.debug('AudioDeviceCheckPlugin: beforeSetActivity payload:', payload);
    if (!payload.activityAvailable) {
      // No need to perform audio check if not attempting to change to an available activity
      return;
    }

    try {
      await checkInputDevice();
      console.log('AudioDeviceCheckPlugin: Microphone check passed. Allowing activity change.');
    } catch (error) {
      // If input device check fails, prevent changing to an available activity
      console.error('AudioDeviceCheckPlugin: Microphone check failed. Preventing activity change.');
      abortOriginal();

      handleInputDeviceError();
    }
  });
}
