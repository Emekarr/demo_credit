import uniqid from 'uniqid';

export default (prefix: string = '', suffix: string = '') => {
	return uniqid(prefix, suffix);
};
