import { v4 as uuidv4 } from 'uuid';

export const generateDbId = () => {
	return uuidv4();
};
