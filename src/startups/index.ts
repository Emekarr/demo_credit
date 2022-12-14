import database from '../database';
import configs from '../config/index';
import ConfigType from '../config/type.config';
const NODE_ENV: string = process.env.NODE_ENV || 'development'
const config: ConfigType = (configs as any)[NODE_ENV];

import event_emitter from '../event_emitter';

export default () => {
	// connect to database
	(database as any)[config.database]();
	// start listening for events
	event_emitter();
};
