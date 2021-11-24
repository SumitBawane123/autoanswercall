import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import * as Flex from '@twilio/flex-ui';

import reducers, { namespace } from './states';

const PLUGIN_NAME = 'AutoanswercallPlugin';

export default class AutoanswercallPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }
  name = 'AutoanswercallPlugin';
  init(flex, manager) {
    manager.workerClient.on("reservationCreated", function(reservation) {
      if (reservation.task.taskChannelUniqueName === 'voice' && reservation.task._worker.attributes.team_name != 'PAL_HC') {
        setTimeout(() => {
          Flex.Actions.invokeAction("AcceptTask", {sid: reservation.task.reservationSid});
          Flex.Actions.invokeAction("SelectTask", {sid: reservation.task.reservationSid});
        }, 5000);
      }
    });
  }
}
