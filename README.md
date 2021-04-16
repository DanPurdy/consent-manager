<!-- # consent-manager [![build status](https://circleci.com/gh/segmentio/consent-manager.svg?style=svg&circle-token=d3a9e0da7a07fb443f1b4e558ad9c60a55dca223)](https://circleci.com/gh/segmentio/consent-manager) -->

:construction: :construction:

This repo is forked and moified from the [@segment/consent-manager@5.0.1](https://github.com/segmentio/consent-manager/releases/tag/v5.0.1) for a few reasons

### Why?

Basically wanted to update some of the dependendencies and change a few of the options of the default drop in - could have made our own integration but for speed and ease of use chose to just modify this library while working on a few new projects. Will probably end up building our own using the exposed methods of this library if the parent repo changes a lot but for now this is fine.

- Use NPM instead of yarn
- All hardcoded text updated to props
- Updates dependencies to remove isomorphic-fetch to isomorphic-unfetch
- Removes emotion and moves over to styled-components as a peer dependency
- Updates the peer dependecy for React to be ^16.10 || ^17.0
- Modifies the default functionality to behave similar to the cookies popup found @[bbc.co.uk/news](https://bbc.co.uk/news) and many other sites as we feel this handles our use case more. Due to the vulnerabilities mentioned above
- Updates styling and prettier config to match current workflow
- Move from CircleCi to Github actions for now

### Possibly Todo

- Update storybook and publish to Github Pages
- Move tests away from enzyme to Jest & testing-library
- Update babel and remove the es2015 preset etc

:construction: :construction:

> Drop-in consent management plugin for analytics.js

## Segment Consent Manager

The Segment Consent Manager is an analytics.js add-on with support to consent management.

At its core, the Consent Manager empowers your visitors to control and customize their tracking preferences on a website. They can opt out entirely of being tracked, or selectively opt out of tools in which they don’t want their information stored.

It works by taking control of the analytics.js load process to only load destinations that the user has consented to and not loading analytics.js at all if the user has opted out of everything. The user's tracking preferences are saved to a cookie and sent as an identify trait (if they haven't opted out of everything) so that you can also access them on the server-side and from destinations (warehouse).

_Segment works to ensure the Consent Manager Tech Demo works with most of our product pipeline. We cannot ensure it works in your specific implementation or website. Please contact our Professional Services team for implementation support. Please see the License.txt included._

**NOTE:** you must include the method `addSourceMiddleware` in the `analytics.methods` array within the original segment snippet in your HEAD:

```
analytics.methods = [
  'trackSubmit',
  'trackClick',
  'trackLink',
  'trackForm',
  'pageview',
  'identify',
  'reset',
  'group',
  'track',
  'ready',
  'alias',
  'debug',
  'page',
  'once',
  'off',
  'on',
  'addSourceMiddleware' // This method is necessary for Consent Manager to forward consent metadata.
]
```

## Orignal License

consent-manager is released under the MIT license.

Copyright © 2018, Segment.io, Inc.

[analytics.js snippet]: https://segment.com/docs/sources/website/analytics.js/quickstart/#step-1-copy-the-snippet
[preact]: https://preactjs.com
[currentscript]: https://caniuse.com/#feat=document-currentscript
[ineu]: https://github.com/segmentio/in-eu
[consentmanager]: #consentmanager
[consentmanagerbuilder]: #consentmanagerbuilder
[top-domain]: https://github.com/segmentio/top-domain
[mapcustompreferences]: #mapcustompreferences
[shouldrequireconsent]: #shouldrequireconsent-1
[preferences]: #preferences
[setpreferences]: #setpreferences
[consentmanager implementation]: src/consent-manager
[css selector]: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
