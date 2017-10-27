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
If you're just starting out with github, they have a [guide/tutorial](https://help.github.com/articles/fork-a-repo/) about forking and cloning.

1. Fork this repo.
2. Navigate to the directory where you're going to keep this code.
3. `git clone` using the forked repo's address.
4. Navigate into the new repository's directory with `cd cliff-effects` (on OSX you can drag and drop the folder into the terminal window).
5. Make sure you're on the main branch with `git checkout dev`.  *Do not touch `master`.*
6. Check your node.js version in your terminal with `node --version`. Versions >=5.0 are preferred. If you don't get a version number (it would look something like 'v6.11.1'), [install node](https://nodejs.org/en/).
7. Install all necessary node packages with `npm install`. This might take a few minutes.
8. Now you can try out the current UI or play with the code!
9. To run a local version of the site so you can play around or debug your changes, type `npm start`. It will automatically open a browser window and run the code locally. If you make changes to a file and save it, the page will automatically update and use the new code. Would also recommend getting the [React Developer Tools](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=4&cad=rja&uact=8&ved=0ahUKEwiZ__6Vg_jVAhWQ14MKHczrDtoQFgg4MAM&url=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Freact-developer-tools%2Ffmkadmapgofadopljbjfkapdkoienihi%3Fhl%3Den&usg=AFQjCNEv0udXgBoaukzJa59I_vufhScUbQ) extension for Chrome.
10. `Ctrl-C` in the terminal to stop the app when it's running.

To keep up to date with the latest changes to the `dev` branch, you'll need to use git to add a new remote branch with this repo's address. The page about [git workflow](https://github.com/codeforboston/cliff-effects/wiki/Git-Workflow) includes some notes about that.

If you have questions, feel free to ask.

## Testing

Testing the project is pretty straightforward! From the cliff-effects directory, run `npm run test`. That's it.

## Resources

### React

We're building the project with [React](https://facebook.github.io/react/docs/react-api.html). The app was set up with the [Create React App CLI](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

### Git

Aren't familiar with Git?  Spend ~15 minutes learning with this [interactive Git tutorial](https://try.github.io/levels/1/challenges/1). Note that we'd prefer you don't use `-f` or `--force` if possible, especially with pull requests.

More familiar with git, but not as familiar with collaboration? See a possible [git workflow](https://github.com/codeforboston/cliff-effects/wiki/Git-Workflow) that could help keep things from getting messy.
