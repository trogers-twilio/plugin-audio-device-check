import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';

import { registerNotifications } from './notifications';
import { createListeners } from './listeners';
import { checkInputDevice, handleInputDeviceError } from './helpers';

const PLUGIN_NAME = 'AudioDeviceCheckPlugin';

export default class AudioDeviceCheckPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    registerNotifications();

    createListeners();

    checkInputDevice().catch(error => {
      handleInputDeviceError();
    });
  }
}
