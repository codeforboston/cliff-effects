A little bit about this tool and a living document.

## Disclaimer

The tool is not meant to be used to make financial decisions. We didn't have access to SMEs (**subject matter experts**), so we couldn't double-check our logic and could not fully account for all regulations. There also wasn't a way to fully test the tool for accuracy.



## A. Input/Output Flow

### Summary

The client puts in their information. Valid answers ([see the definition of valid input](#d1-valid-input)) are processed into the [`client`](#d2-the-client-object) object. Calculations are made, and the result of the calculations are displayed.

1. At the start, the client data is filled with valid default values (to be linked). That practice is [an open question](#e3-default-client-data).
2. The client then answers questions.
3. The answer doesn't get stored at that point. First we make sure the answer is valid. If it's valid, it's stored. If not, the user is still allowed to put in the data, but they're given feedback and the data is thrown out as soon as the user clicks out of that question. It's replaced by the most recent valid answer.
4. Valid answers are stored in the `client` object.
5. The last form section sends the client data to the calculation logic.
6. The calculation manager make a copy of the `client` object. It then applies the calculations one by one, in the right order. Each calculation changes (mutates) the client object so that the new values affect the next calculations in the right way.
7. The results come back and the output is shown to the user.



## B. You Don't Need a Coder for Everything

There are some things that a non-coder can do to update the calculations. For example, the calculations are based on data that can change. There are ways to make that data easily changed by non-coders. The federal poverty limits are a good example. Another good example is the order in which benefits are calculated.



## C. Privacy and Security

If the user reloads the page, all the answers are erased. Our research into storing and processing private data showed us that we'd need lawyers and expensive servers if we wanted to store actual client data without breaking their privacy and security. Since we need to test with real clients and real data, we decided to keep the data as anonymous as possible and to avoid storing it.



## D. Definitions

### D1. Valid input

'Valid' sometimes means that it won't mess up the calculations and sometimes means that it tries hard to not let the user mix up their answers. For example, 'contract rent' has to be more money than 'rent share', and the app lets the user know what's wrong and how to fix it. It doesn't store the wrong answers.

### D2. The `client` object

Client data is made up of two parts - `current` data and `future` data. The `future` data is used to make predictions. With some programs, it's impossible to make `future` predictions without knowing the `current` values, and we need all calculation logic to work the same, so we send the full `client` object to all calculations. (Link to be added to the documentation section of the client defaults object.)



## E. Limitations and Open Questions

### E1. Unavoidable wrong results

When the client first got their benefits, the assessor asked them to estimate what they'd make in the future. By the time the client sits down with the tool, they know exactly what they've made. If the client doesn't remember the exact info they gave to the assessors of their benefits, then our calculations won't match up with theirs.

### E2. Clients with extensions or allowances

How do we account for special circumstances, like extensions or special allowances? Options:

E2a. We can offer flexibility by allowing users to replace our information with theirs. Figuring out what specific flexibility to allow needs to be done with a subject matter expert. This is a bit dangerous, though - it may lead clients who haven't entered information correctly to assume the calculations are wrong, leaving us inaccurate data for the rest of the calculations. Also, it would let us show them a snapshot of a future result - for the text, table, and bar chart results - but the line graphs may not be able to adjust their calculations for that data.

E2b. We can ask if there are special circumstances at the start and then let people know that the calculations won't be accurate and/or not allow them to use the tool to do their calculations.

### E3. Default client data

The fact that we've made things more simple by always having valid client data means that we use default values. The down-side is that we've found that sometimes people seem hesitant about changing default data, though it hasn't seemed to actually block anyone so far. Unfortunately, there's probably also a bigger chance that the client will skip answers or that they'll leave incorrect values in place. One up-side is that calculations don't have to worry about checking to make sure everything's valid. Another is that the client doesn't have to fill out every value - there are a lot of money inputs that can just be 0. Whether it's good or bad, the user isn't blocked from leaving any form section, though that can be allowed to other ways as long as there's a clear indicator always visible about which sections still need information.

### E4. Predicting other changes

Right now, the tool only lets people try out new incomes. In future, it could let people try changing other circumstances. That could make the output a lot harder to show, though. You can graph the change in benefit amount as income increases. Can you graph the change in benefit amount as family members increase? That's part of why we have so many different kinds of charts to show changes, but the question of how to show each kind of change is still an open one.

### E5. Rounding

We couldn't find information on how the State rounds its numbers. We chose our own, but it can be easily changed.

### E6. Graph viewing ratios

Our x-axis value is hard-coded. That means that if benefits taper off half-way through, half of the graph isn't useful. That also means the person looking at the graphs is always looking at the same size of graph. They can easily compare one set of life circumstances to another set. One feature we're working on is the ability to zoom in on the graph to see a section of particular interest more clearly.

### E7. Usability

The type of interaction our partners were looking for was a user-friendly one. Something less like Free Fillable Forms. We'd still like to give the user more guidance and information, but we currently don't have access to that information ourselves.



## F. Next Steps

- Develop a coding style for the calculation logic that mimics the structure of the regulations it represents, easing communication between subject matter experts and coders.
- Develop a all-of/any-of/none-of structure for form questions to manage which questions are show to the user.
- Accessibility, including:
  - Useful tab order.
  - Better contrast for UI responsiveness.
  - aria-* attributes
- Mobile-friendly styles.
- More plain-language versions of explanations.
- Implement zooming on the graphs of the results.
- Better predictions - don't wait for the user to guess a future income amount. Instead, go through all future values and look for all possible cliffs.
- Convert to a system where the app takes information about each individual household member, not just the household as one unit.
- Allow people with permission to mark a benefit as out of date. Warn the user about that benefit's calculations.
- Automated expiration dates for benefit data and logic that are used to let app users know when something may be less accurate.
- Set up data tables that non-coders can edit to change how the benefits are calculated.
- With the help of a subject matter expert, create logic that notes what client change has caused the main change in benefit amount, and what benefit rules caused the main change in the benefit amount.
- Translations for non-English readers.
- A pop-out 'calculator' that will show weekly, monthly, and yearly values for whichever you put in - basically the same as any money input row.
- A pop-out 'calendar' for putting in the varying amounts of work for the year that will then average out the amounts for the year.
- User-friendly icons and colors to more clearly visually represent what's going on.




## G. Code and Code Cautions

### G1. WARNING: Values the user shouldn't change

In the future, this tool could let users try out changes in multiple life circumstances, not just their future income. That said, it should never allow users to change certain kinds of future values. For example, right now the rent share looks like an input _and_ an output. Rent share is just another way of showing the amount of the housing voucher and it _is_ an input for current values. We need that information to calculate future values of the housing voucher. Because we ourselves calculate future values, though, it absolutely can't be a user input field for future values. Basically, you can't put something as an input if it's already a calculated result from the app.

### G2. Translation objects

Translation objects are the way we're working on making the app translatable. As you can see, they have version numbers in the language files. When big changes are made to an English translation object, we bump up that translation object's version number. We then use that to be able to tell what translation objects are out of date in other languages. If a translation object is out of date in another language, the app uses the English translation object by default. When another language's translation object is brought up-to-date with the English one, its version number is updated and it will be used in the app again.

When the code preps the translation objects for the app, though, it gets rid of the version numbers so that it'll be easier to maintain the code as translation objects change. Because we don't want the key name change to be invisible, we decided to add `i_` to the beginning of the translation object. That way a person new to the project can at least see that the weirdness is deliberate and can easily search the code for `i_` to find the source.

There's a wiki page in the works about the flow of editing translation object files, since we use google docs to allow non-coders to edit the translations.

### G3. See some guides in our [wiki](https://github.com/codeforboston/cliff-effects/wiki)
