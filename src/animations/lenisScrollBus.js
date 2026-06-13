const scrollCallbacks = new Set();

export const subscribeScroll = (callback) => {
	if (!callback) return () => {};
	scrollCallbacks.add(callback);
	callback();
	return () => scrollCallbacks.delete(callback);
};

export const notifyScroll = () => {
	scrollCallbacks.forEach((callback) => callback());
};
