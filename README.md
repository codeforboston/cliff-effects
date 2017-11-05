# cliff-effects

> **cliff effect**: You are a person on government benefits, and you get a raise.  You're making more money!  But now that your income is higher, you don't make the cutoff for the benefits you receive.  Even though you're taking home more money, your situation is worse. Some of your benefits drop to nothing, or almost nothing. You've fallen off "the cliff."

We are building the Cliff Effects webapp to help* [Project Hope](http://www.prohope.org/about/) case workers make quantifiable predictions about their clients' potential cliff effects - and advise their clients accordingly.  

(* Case workers handle their clients' problems on the ground; they aren't responsible for navigating benefit programs' complex policies, they do not have the time/resources to translate those policies into models. There's where we come in.)


## Status
We currently have a ReactJS frontend prototype.

We are working on:

- *Benefit amount calculations*: Converting rules into backend logic
- *Data visualization*: Experimenting with different ways of portraying "the cliff"
- *Simplifying user experience*: Making the tool navigable by case workers


## How Can I Contribute?

1. Familiarize yourself with the [frontend](https://codeforboston.github.io/cliff-effects/#/).
2. Decide whether you want to work on benefit calculations, code quality, data visualization, user experience, or project management.
3. If you plan to develop code, [set up your environment](#environment-setup).

We use GitHub Issues to organize our work.  Here's some quick reading about [how to use issues](https://guides.github.com/features/issues/), and here's the [Cliff Effects issues board](https://github.com/codeforboston/cliff-effects/milestone/1).


## Environment Setup
To follow these instructions, it'd help if you:
- have mentally perpared for experimentation and learning and/or
- know how to open your terminal/command prompt
- know a bit about how to navigate to different folders in your terminal
- know a bit about installing software for your terminal, like nodejs

Instructions:
1. If you know how, fork and clone the repo, and create a link (a remote branch) to our repo. If not, see this [github guide](https://help.github.com/articles/fork-a-repo/). Go through all the steps.
2. In your termainal/command prompt, do `git checkout dev`. *Do not touch the `master` branch.*
3. If you don't have nodejs, install it (see [install nodejs](https://nodejs.org/en/)). If you're not sure if you have nodejs, do the next step. If you don't get a number, you don't have nodejs.
4. Check your node.js version in your terminal with `node --version`. It should show a number. Version 5.0 or greater is preferred.
5. In your terminal, do `npm install`. This might take a few minutes.
6. Now you'll be able to try out the current UI or play with the code!
7. To see a local version of the site, in your terminal type `npm start`. It should open a browser window with the site loaded. It works best in Chrome.
8. To make changes to the site and see them, just change the code in the files, save the changes, and the browser page will automatically reload. If you don't see the changes, refresh the page. If it's still not looking different, you may have done something incorrectly. Feel free to ask one of us.
9. To stop the local version, in your terminal press `Ctrl-C`.

To get yourself set up to keep up to date with the latest changes to the `dev` branch, make sure you've gone through [Step 3 of the github guide](https://help.github.com/articles/fork-a-repo/#step-3-configure-git-to-sync-your-fork-with-the-original-spoon-knife-repository). To keep your branches from getting tangled as you both make changes and keep up to date with our repo, take a look at our wiki page about a possible [git workflow](https://github.com/codeforboston/cliff-effects/wiki/Git-Workflow).

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

Aren't familiar with Git?  Spend ~15 minutes learning with this [interactive Git tutorial](https://try.github.io/levels/1/challenges/1). Note that we'd prefer you don't use `-f` or `--force` if possible, especially with a branch that you have used to create a pull request.

More familiar with git, but not as familiar with collaboration? See a possible [git workflow](https://github.com/codeforboston/cliff-effects/wiki/Git-Workflow) that could help keep things from getting messy.
