import path from "path";
import {URL} from "url";
import {mapping} from "./mapping.js";

const lowercaseMapping = {};
for(let key in mapping) {
	lowercaseMapping[key.toLowerCase()] = mapping[key];
}

function isFullUrl(url) {
	try {
		new URL(url);
		return true;
	} catch(e) {
		return false;
	}
}

function parseSource(source) {
	let urlObject = new URL(source);
	if(urlObject.hostname === "twitter.com") {
		let [noop, username, statusStr, statusId] = urlObject.pathname.split("/");
		return {
			// normalize to lower case
			username: username.toLowerCase(),
			url: source,
			status: statusId,
		}
	}

	return {
		url: source
	};
}

export function normalizeUrlSlashes(...args) {
	let joined = path.join(...args.filter(entry => !!entry));
	return joined.split(path.sep).join("/");
}

// source can be a path or a full tweet URL
export function transform(source) {
	// passthrough
	if(!isFullUrl(source)) {
		return source;
	}

	let { username, status } = parseSource(source);

	if(username && lowercaseMapping[username]) {
		let urlObject = new URL(lowercaseMapping[username]);
		urlObject.pathname = normalizeUrlSlashes(urlObject.pathname, status);

		let urlString = urlObject.toString();
		let hasTrailingSlash = source.endsWith("/");

		return urlString + (!urlString.endsWith("/") && hasTrailingSlash ? "/" : "");
	}

	return source;
}