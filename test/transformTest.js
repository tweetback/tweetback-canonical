import test from "ava";
import {transform, normalizeUrlSlashes} from "../transform.js";

test("normalizeUrlSlashes", t => {
	t.is(normalizeUrlSlashes("test"), "test");
	t.is(normalizeUrlSlashes("test", "test"), "test/test");
	t.is(normalizeUrlSlashes("test/"), "test/");
	t.is(normalizeUrlSlashes("/test/", "/test/"), "/test/test/");
});

test("Missing from mapping (passthrough)", t => {
	t.is(transform("https://example.com"), "https://example.com");
	t.is(transform("https://example.com/"), "https://example.com/");
	t.is(transform("@zachleat@zachleat.com"), "@zachleat@zachleat.com");
	t.is(transform("/"), "/");
	t.is(transform("ht/twit"), "ht/twit");
});


test("Plain Transform", t => {
	t.is(transform("https://twitter.com/zachleat"), "https://www.zachleat.com/twitter/");
	t.is(transform("https://twitter.com/zachleat/"), "https://www.zachleat.com/twitter/");

	t.is(transform("https://twitter.com/eleven_ty"), "https://twitter.11ty.dev/");
	t.is(transform("https://twitter.com/eleven_ty/"), "https://twitter.11ty.dev/");
});

test("Transform with Status", t => {
	t.is(transform("https://twitter.com/zachleat/status/123"), "https://www.zachleat.com/twitter/123");
	t.is(transform("https://twitter.com/eleven_ty/status/123"), "https://twitter.11ty.dev/123");
});

test("Preserve trailing slashes", t=> {
	t.is(transform("https://twitter.com/zachleat/status/123/"), "https://www.zachleat.com/twitter/123/");
	t.is(transform("https://twitter.com/eleven_ty/status/123/"), "https://twitter.11ty.dev/123/");
});

test("Case sensitivity", t=> {
	t.is(transform("https://twitter.com/terribleMia/status/123/"), "https://tweets.miriamsuzanne.com/123/");
	t.is(transform("https://twitter.com/terriblemia/status/123/"), "https://tweets.miriamsuzanne.com/123/");
});