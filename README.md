# cliff-effects  [![TravisCI](https://travis-ci.org/codeforboston/cliff-effects.svg?style=shield)](https://travis-ci.org/codeforboston/cliff-effects) [![CodeCov](https://img.shields.io/codecov/c/github/codeforboston/cliff-effects.svg)](https://codecov.io/gh/codeforboston/cliff-effects)
> **cliff effect**: You are a person on government benefits, and you get a raise.  You're making more money!  But now that your income is higher, you don't make the cutoff for the benefits you receive.  Even though you're taking home more money, your situation is worse. Some of your benefits drop to nothing, or almost nothing. You've fallen off "the cliff."

We are building the Cliff Effects webapp to help* [Project Hope](http://www.prohope.org/about/) case managers make quantifiable predictions about their clients' potential cliff effects - and advise their clients accordingly.

(* Case workers handle their clients' problems on the ground; they aren't responsible for navigating benefit programs' complex policies and do not have the time/resources to translate those policies into models.)


## Status
We currently have a ReactJS frontend prototype and start going into beta testing at the end of January.

We are working on:

- *User testing*: Beta testing with case managers is about to start
- *Feedback*: Setting up a useful way to get feedback from users
- *Infrastructure*: Strengthening the code we have to make it more robust and maintainable


## How Can I Contribute?

1. Familiarize yourself with the [frontend](https://codeforboston.github.io/cliff-effects/#/).
2. Decide whether you want to work on benefit calculations, code quality, data visualization, user experience, or project management.
3. If you plan to develop code, [set up your environment](#environment-setup).

We use GitHub Issues to organize our work.  Here's some quick reading about [how to use issues](https://guides.github.com/features/issues/), and here's the [Cliff Effects issues board](https://github.com/codeforboston/cliff-effects/milestone/1).


## Environment Setup
To follow these instructions, it'd help if you:
- have mentally prepared for experimentation and learning and/or
- know how to open your terminal/command prompt
- know a bit about how to navigate to different folders in your terminal
- know a bit about installing software for your terminal, like nodejs

Instructions:
1. If you're new to github look at [How to: fork a repo](https://help.github.com/articles/fork-a-repo/). Otherwise, fork and clone the repo, creating a link (remote branch) to the Code for Boston repo.
2. In your termainal/command prompt, do `git checkout dev`. *Do not touch the `master` branch.*
3. If you have [nodejs](https://nodejs.org/en/), version 5.0+ is desired. If you don't, [install it](https://nodejs.org/en/download/). If you don't know, do `node --version` in your terminal/command prompt. If you don't get a number, you don't have it.
4. In your command prompt/terminal, do `npm install`. This might take a few minutes. Now you'll be able to try out the current UI or play with the code!
5. Do `npm start` in terminal to automatically open a new browser tab and see a local version of the site. Works best in Chrome.
6. npm bug workaround: please run `git checkout .` after any instances of running `npm install`. This is to circumvent a bug affecting the integrity of the package-lock.json file.
7. Saved changes will automatically be reflected in-browser. If you don't see the changes, refresh the page. If nothing has changed, ask for help!
8. Press cltr+c to stop the local server that you have running.

<!-- Further discussion needed. See outdated comments for merge #154 (near the bottom of them). -->
To get yourself set up to keep up to date with the latest changes to the `dev` branch, make sure you've gone through [Step 3 of the github guide](https://help.github.com/articles/fork-a-repo/#step-3-configure-git-to-sync-your-fork-with-the-original-spoon-knife-repository). To keep your branches from getting tangled as you both make changes and keep up to date with our repo, take a look at our wiki page about a possible [Github workflow](https://github.com/codeforboston/cliff-effects/wiki/Guide:-Github-Workflow).

<!-- Further discussion needed. See outdated comments for merge #154 (near the bottom of them). -->
If you're interested in more in-depth debugging, we also recommend getting the [React Developer Tools](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=4&cad=rja&uact=8&ved=0ahUKEwiZ__6Vg_jVAhWQ14MKHczrDtoQFgg4MAM&url=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Freact-developer-tools%2Ffmkadmapgofadopljbjfkapdkoienihi%3Fhl%3Den&usg=AFQjCNEv0udXgBoaukzJa59I_vufhScUbQ) extension for Chrome.

If you have questions, feel free to ask.

## Testing

We use [React-Scripts test command](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests) (which wraps the [Jest](https://facebook.github.io/jest/) test framework) to run our [automated test suite](https://en.wikipedia.org/wiki/Test_automation).

To run our test suite, run `npm run test`. That will run any tests that have changed since the last commit, and boot up an interactive testing session. The interactive session will prompt you with instructions, but the most important commands are `a` to run all tests, and `q` to quit the interactive session.

For information on how to *write* new tests, please refer to the [React-Scripts documentation](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#writing-tests) on the subject.

## Resources

### React

We're building the project with [React](https://facebook.github.io/react/docs/react-api.html). The app was set up with the [Create React App CLI](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

### Git

Aren't familiar with Git?  Spend ~15 minutes learning with this [interactive Git tutorial](https://try.github.io/levels/1/challenges/1). Don't use -f or --force with branches that you have used to create a pull request.

More familiar with git, but not as familiar with collaboration? See a possible [Github workflow](https://github.com/codeforboston/cliff-effects/wiki/Guide:-Github-Workflow) that could help keep things from getting messy.
