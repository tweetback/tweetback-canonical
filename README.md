# @tweetback/canonical

A package to resolve twitter URLs to new canonically hosted twitter backups.

## Installation

```
npm install @tweetback/canonical
```

## Usage

```js
import {transform} from "@tweetback/canonical";

transform("@zachleat");
// Returns "https://www.zachleat.com/twitter/"

transform("@eleven_ty");
// Returns "https://twitter.11ty.dev/"
```

Works with status URLs:

```js
transform("@zachleat/123");
// Returns "https://www.zachleat.com/twitter/123"

transform("https://twitter.com/zachleat/status/123");
// Returns "https://www.zachleat.com/twitter/123"
```

Other features:

* Preserves trailing slashes
* Throws an error if you try to transform an unknown username (starts with `@`)
* Passthrough any other URLs normally.
* Normalizes slashes in the pathname properly

## Add your own Twitter Archive:

You needn’t use tweetback to add your archive here. The only requirement here is that your archive has URL parity and has individually addressable URLs for each status.

Just create a PR with your addition to the `mapping.js` file and we’ll have a look!