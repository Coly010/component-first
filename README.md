<h1 align="center">Component-First</h1>

This repo contains code that aims to prove the Component-First Architecture Pattern described in the following article:  
https://colum-ferry.medium.com/component-first-architecture-with-angular-and-standalone-components-f9fc6a6cbd11

## What's in this repo?

In this repo, there are two things:

- A Declarative Router _(`libs/router`)_
- An Example App that implements the Component First Pattern _(`apps/example-app`)_

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
