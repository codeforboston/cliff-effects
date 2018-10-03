# Installation and Setup

## Preparing Yourself

To follow these instructions, it'd help if you:

- have mentally prepared for experimentation and learning and/or
- know how to open your terminal/command prompt
- know a bit about how to navigate to different folders in your terminal
- know a bit about installing software for your terminal, like nodejs

## Github Setup

If you're new to github look at [How to: fork a repo](https://help.github.com/articles/fork-a-repo/). Otherwise, fork and clone the repo, creating a link (remote branch) to the Code for Boston repo.

In your termainal/command prompt, do `git checkout dev`.

_Do not touch the `master` branch._

## Dependency Installation

### [NVM](https://github.com/creationix/nvm)

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

### [Node/NPM](https://nodejs.org/en/)

```
nvm install $(cat .node-version)
```

## Project Dependency Installation

First, make sure you're using the correct node version

```
nvm use $(cat .node-version)
```

Now, run:

```
npm i
```

## Setup

Running the app is as easy as:

```
npm start
```

Saved changes will automatically be reflected in-browser. If you don't see the changes, refresh the page. If nothing has changed, ask for help!

Press cltr+c to stop the local server that you have running.

## Troubleshooting

1. npm bug workaround: please run `git checkout .` after any instances of running `npm install`. This is to circumvent a bug affecting the integrity of the package-lock.json file.
