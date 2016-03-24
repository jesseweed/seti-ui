'use babel';
'use strict';

import config from './config';
import {Settings} from './settings';

export default {
  config,
  activate() {
    Settings.init();
  }
}
