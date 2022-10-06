export default () => {
	import('./listener').then(async (listener) => {
		await listener.default();
	});
	console.log('listening for events');
};
