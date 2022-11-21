import test from "ava";
import {transform, normalizeUrlSlashes} from "../transform.js";

test("normalizeUrlSlashes", t => {
	t.is(normalizeUrlSlashes("test"), "test");
	t.is(normalizeUrlSlashes("test", "test"), "test/test");
	t.is(normalizeUrlSlashes("test/"), "test/");
	t.is(normalizeUrlSlashes("/test/", "/test/"), "/test/test/");
});

test("Missing", t => {
	t.throws(() => transform("@test"));
	t.is(transform("https://example.com"), "https://example.com");
	t.is(transform("https://example.com/"), "https://example.com/");
});


test("Plain Transform", t => {
	t.is(transform("@zachleat"), "https://www.zachleat.com/twitter/");
	t.is(transform("https://twitter.com/zachleat"), "https://www.zachleat.com/twitter/");
	t.is(transform("https://twitter.com/zachleat/"), "https://www.zachleat.com/twitter/");

	t.is(transform("@eleven_ty"), "https://twitter.11ty.dev/");
	t.is(transform("https://twitter.com/eleven_ty"), "https://twitter.11ty.dev/");
	t.is(transform("https://twitter.com/eleven_ty/"), "https://twitter.11ty.dev/");
});

test("Transform with Status", t => {
	t.is(transform("@zachleat/123"), "https://www.zachleat.com/twitter/123");
	t.is(transform("https://twitter.com/zachleat/status/123"), "https://www.zachleat.com/twitter/123");

	t.is(transform("@eleven_ty/123"), "https://twitter.11ty.dev/123");
	t.is(transform("https://twitter.com/eleven_ty/status/123"), "https://twitter.11ty.dev/123");
});

test("Preserve trailing slashes", t=> {
	t.is(transform("@zachleat/123/"), "https://www.zachleat.com/twitter/123/");
	t.is(transform("https://twitter.com/zachleat/status/123/"), "https://www.zachleat.com/twitter/123/");

	t.is(transform("@eleven_ty/123/"), "https://twitter.11ty.dev/123/");
	t.is(transform("https://twitter.com/eleven_ty/status/123/"), "https://twitter.11ty.dev/123/");
});

test("Errors", t => {
	// bad url
	t.throws(() => transform("ht/twit"));
});