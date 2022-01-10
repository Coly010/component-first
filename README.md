<h1 align="center">Component-First</h1>

This repo contains code that aims to prove the Component-First Architecture Pattern described in the following article:  
https://colum-ferry.medium.com/component-first-architecture-with-angular-and-standalone-components-f9fc6a6cbd11

## Contents

- [What's in this repo?](#whats-in-this-repo)
- [Why should we care about Component-First?](#why-should-we-care-about-component-first)
- [Component-First Router?](#component-first-router)
- [Usage?](#component-first-router)

## What's in this repo?

In this repo, there are two things:

- A Declarative Router _(`libs/router`)_
- An Example App that implements the Component First Pattern _(`apps/example-app`)_

## Why should we care about Component-First?

Component-First aims to create an architectural pattern that places Components as the source of truth for your Angular application.  
Currently in the Angular ecosystem, `NgModules` act almost like orchestrators, wiring together your application. It's from the very existence of `NgModules` where we created the `AppModule` -> `FeatureModules` -> `SharedModules` -> `CoreModules` architecture.  
This architecture is fine. It works. It scales. But is it overkill? Possibly.

While it does introduce a great separation of concerns within your app's structure, `CoreModules` and `SharedModules` often become overpopulated and difficult to maintain. `SharedModules` in particular can become a dumping ground. This often leads to a situation where we need to import the `SharedModule` into all our `FeatureModules`, even if we one need 1 thing from it.

With Component-First, our Components decide themselves what they need to perform. They can take `Injectables` via their `constructor` and they can import any `component`, `directive` or `pipe` they need to function. This increased level of granularity allows our Components to be hyper-focused on their function, reducing any additional bloat that might end up compiled with the Component.

Components in a Component-First Architecture will be completely tree-shakeable. If they aren't imported or routed to, they won't be included in the final bundle for our applications. Currently, to achieve the same effect with `NgModules`, we need to follow a pattern known as the [SCAM (Single Component Angular Module) Pattern](https://dev.to/this-is-angular/emulating-tree-shakable-components-using-single-component-angular-modules-13do) which was popularized by [Lars Gyrup Brink Nielsen](https://twitter.com/LayZeeDK).

By following the Component-First Architecture Pattern, we also reduce the coupling between our Components and `NgModules` which paves the way to a truly `NgModule`-less Angular. We can still keep all the same composability that `NgModules` offered by simply following some best practices on code-organization; something Angular has us well trained to do already.

If components point to components, our mental mind map of our application becomes simpler. You can traverse the tree of components in your app and build out a pretty comprehensive map of your app, without having to worry about `NgModules` adding additional dependencies on your components that you may not be expecting. In Component-First, your components dictate their own dependencies. This massively reduces cognitive load, especially for newcomers to the codebase.

We can separate our Components by domain/feature and then finally by smart/dumb (container/presentation). If our domain/feature requires routing, then we can follow a pattern to have a Component act as a Route Entry Point, where we define the routes for that domain/feature.

If we look at the image below, we can see a separation of domains/features each with a `route-entry.component`. This builds consistency within our codebase. There's a [Power in Constraints](https://www.youtube.com/watch?v=X-Dn5ZBUZH0).

![Folder Structure for Component-First](https://miro.medium.com/max/488/0*rczFxsGW4hsmlRNK)

## Component-First Router

The router in this repo is not intended for production use. It is simply to prove the Component-First Pattern.  
That said, the following illustrates the state of the features that are expected to exist for the router.

- Standard Routing _(implemented)_
- Nested Routing _(implemented)_
- Lazy Routing _(implemented)_
- Deep Linking _(implemented)_
- Route Guards
- Route Resolvers

## Usage

If you would like to see the pattern in action, follow the steps below:

- Clone the repo
- Run `yarn install`
- Run `yarn nx serve example-app`
