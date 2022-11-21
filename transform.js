import path from "path";
import {URL} from "url";
import {mapping} from "./mapping.js";

function isFullUrl(url) {
	try {
		new URL(url);
		return true;
	} catch(e) {
		return false;
	}
}

function parseSource(source) {
	if(source.startsWith("@")) {
		let [username, statusId] = source.split("/");
		return {
			username: username.slice(1),
			status: statusId,
		}
	}

	let urlObject = new URL(source);
	if(urlObject.hostname === "twitter.com") {
		let [noop, username, statusStr, statusId] = urlObject.pathname.split("/");
		return {
			username: username,
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

// source can be a username starting with an @: e.g. @zachleat
// or a full tweet URL
export function transform(source) {
	let startsWithAt = source.startsWith("@");
	if(!isFullUrl(source) && !startsWithAt) {
		return source;
	}

	let { username, status } = parseSource(source);

	if(username && startsWithAt && !mapping[username]) {
		throw new Error(`Username mapping for @${username} not found.`)
	}

	if(username && mapping[username]) {
		let urlObject = new URL(mapping[username]);
		urlObject.pathname = normalizeUrlSlashes(urlObject.pathname, status);

		let urlString = urlObject.toString();
		let hasTrailingSlash = source.endsWith("/");

		return urlString + (!urlString.endsWith("/") && hasTrailingSlash ? "/" : "");
	}

	return source;
}