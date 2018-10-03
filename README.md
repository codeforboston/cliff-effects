# cliff-effects [![TravisCI](https://travis-ci.org/codeforboston/cliff-effects.svg?style=shield)](https://travis-ci.org/codeforboston/cliff-effects) [![CodeCov](https://img.shields.io/codecov/c/github/codeforboston/cliff-effects.svg)](https://codecov.io/gh/codeforboston/cliff-effects)

> **cliff effect**: You are a person on government benefits, and you get a raise. You're making more money! But now that your income is higher, you don't make the cutoff for the benefits you receive. Even though you're taking home more money, your situation is worse. Some of your benefits drop to nothing, or almost nothing. You've fallen off "the cliff."

We are building the Cliff Effects webapp to help\* [Project Hope](http://www.prohope.org/about/) case managers make quantifiable predictions about their clients' potential cliff effects - and advise their clients accordingly.

(\* Case workers handle their clients' problems on the ground; they aren't responsible for navigating benefit programs' complex policies and do not have the time/resources to translate those policies into models.)

## Status

We currently have a ReactJS frontend prototype and start going into beta testing at the end of January.

We are working on:

- _User testing_: Beta testing with case managers is about to start
- _Feedback_: Setting up a useful way to get feedback from users
- _Infrastructure_: Strengthening the code we have to make it more robust and maintainable

## How Can I Contribute?

1. Familiarize yourself with the [frontend](https://codeforboston.github.io/cliff-effects/#/).
2. Decide whether you want to work on benefit calculations, code quality, data visualization, user experience, or project management.
3. If you plan to develop code, [set up your environment](#environment-setup).

We use GitHub Issues to organize our work. Here's some quick reading about [how to use issues](https://guides.github.com/features/issues/), and here's the [Cliff Effects issues board](https://github.com/codeforboston/cliff-effects/milestone/1).

## Environment Setup

Check out our [Installation and Setup](./dev-docs/INSTALLATION-AND-SETUP.md) guide for information around
setting up the project on your local computer.

## Testing

We use [React-Scripts test command](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests) (which wraps the [Jest](https://facebook.github.io/jest/) test framework) to run our [automated test suite](https://en.wikipedia.org/wiki/Test_automation).

To run our test suite, run `npm run test`. That will run any tests that have changed since the last commit, and boot up an interactive testing session. The interactive session will prompt you with instructions, but the most important commands are `a` to run all tests, and `q` to quit the interactive session.

For information on how to _write_ new tests, please refer to the [React-Scripts documentation](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#writing-tests) on the subject.

## Resources

### React

We're building the project with [React](https://facebook.github.io/react/docs/react-api.html). The app was set up with the [Create React App CLI](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

### Git

Aren't familiar with Git? Spend ~15 minutes learning with this [interactive Git tutorial](https://try.github.io/levels/1/challenges/1). Don't use -f or --force with branches that you have used to create a pull request.

More familiar with git, but not as familiar with collaboration? See a possible [Github workflow](https://github.com/codeforboston/cliff-effects/wiki/Guide:-Github-Workflow) that could help keep things from getting messy.
