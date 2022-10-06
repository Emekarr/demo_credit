import Emitter from './emitter';

import events from './events';

export default () =>
	Object.values(events).forEach((event) => {
		Object.values(event).forEach(async (evt) => {
			await Emitter.listen(evt.EVENT, evt.ACTION);
		});
	});
