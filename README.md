# cliff-effects

> **cliff effect**: You are a person on government benefits, and you get a raise.  You're making more money!  But now that your income is higher, you don't make the cutoff for the benefits you receive.  Even though you're taking home more money, your situation is worse. Some of your benefits drop to nothing, or almost nothing. You've fallen off "the cliff."

We are building the Cliff Effects webapp to help* [Project Hope](http://www.prohope.org/about/) case workers make quantifiable predictions about their clients' potential cliff effects - and advise their clients accordingly.  

(* Case workers handle their clients' problems on the ground; they aren't responsible for navigating benefit programs' complex policies, they do not have the time/resources to translate those policies into models. There's where we come in.)


## Status
We currently have a ReactJS frontend prototype.

We are working on:

- *Benefits eligibility rules*: Converting rules into backend logic
- *Data visualization*: Experimenting with different ways of portraying "the cliff"
- *Simplifying user experience*: Making the tool navigable by case workers


## How Can I Contribute?

1. Familiarize yourself with the [frontend](https://codeforboston.github.io/cliff-effects/#/).
2. Decide whether you want to work on benefits eligibility, data visualization, or user experience.
3. If applicable, [set up your environment](#environment-setup). (Protip: it is always applicable.)

We use GitHub Issues to organize our work.  Here's some quick reading about [how to use issues](https://guides.github.com/features/issues/), and here's the [Cliff Effects issues board](https://github.com/codeforboston/cliff-effects/issues).

Aren't familiar with Git?  Spend ~15 minutes learning with this [interactive Git tutorial](https://try.github.io/levels/1/challenges/1).

[Create React App README](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).


## Environment Setup

1. If you don't already have Node.js, [install it](https://nodejs.org/en/) (v6.11.1 is verified as compatible).  Check if Node is already installed with `node --version` in terminal.  Version 5.0+ are preferred.
2. Open the node command prompt and change into the directory that you want to clone the app to.
3. Fork this repo.
4. Change into the new repository's directory with `cd cliff-effects`.
5. Change to the master branch with `git checkout dev`.  *We have disabled working off `master`.*
6. Install all necessary node packages with `npm install`. This might take a few minutes.
7. Type `npm start` to automatically open a browser window and run the app in your browser in dev mode. If you make changes to a file and save it, the page will automatically update and use the new code. Would also recommend getting the [React Developer Tools](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=4&cad=rja&uact=8&ved=0ahUKEwiZ__6Vg_jVAhWQ14MKHczrDtoQFgg4MAM&url=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Freact-developer-tools%2Ffmkadmapgofadopljbjfkapdkoienihi%3Fhl%3Den&usg=AFQjCNEv0udXgBoaukzJa59I_vufhScUbQ) extension for Chrome.
8. `Ctrl-C` to stop the app when it's running.
9. Type `npm run deploy` to build a production version of the app.

We currently have it set up to deploy automatically to GitHub pages with `npm run deploy`.
