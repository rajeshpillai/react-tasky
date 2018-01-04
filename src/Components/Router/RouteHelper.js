/* global history */
/* eslint no-restricted-globals: ["off", "history"]*/


let instances = [];

const register = (comp) => instances.push(comp);
const unregister = (comp) => instances.splice(instances.indexOf(comp), 1);

const historyPush = (path) => {
	history.pushState({}, null, path);
	instances.forEach(instance => instance.forceUpdate());
}

const historyReplace = (path) => {
	history.replaceState({}, null, path);
	instances.forEach(instance => instance.forceUpdate());
}

export default   {
	register,
	unregister,
	historyPush,
	historyReplace
}