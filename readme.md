# Jelly Drop (Front End) ReadMe:

## A Mobile Application built with React Native 

**Developed during the 2018 Covalence Nashville Cohort, by Justin Head, Alan Pramuk, and Robert Tate.** 

![](./images/jellybeansmedium.png)



## Synopsis:
Jelly Drop is a daily game where players can actively or passively collect little jellies around the world to receive points towards their total score. Every day, the player has 20 jellies to place around town using an interactive map screen. The goal is to drop all of your own jellies in places where other players will find them and collect them (they get points for doing so). Aside from dropping jellies (2pts), you also need to collect other jellies dropped by other players (24pts for each one you collect, and a new jelly you can drop again). There are built-in weekly bonuses, and the game resets monthly. Scores are calculated for individual players, and a top 100 leaderboard page shows rankings for the current game, last game, and all time score.

---
---
## Front End Top Mentions:
* [React Native](https://facebook.github.io/react-native/)
    * The Framework we used to build this native mobile app.
* [NativeBase](https://nativebase.io/)
    * While much of the styling in the project was custom, NativeBase was used for minor adjustments.
* [React Navigation](https://reactnavigation.org/)
    * This library was used to build navigation between screens, and set up an authentication flow using a switch navigator. 
* [React Native AWS3](https://github.com/benjreinhart/react-native-aws3)
    * Used to set up profile images, which could then be stored in our MySQL Database.
* [React Native Maps](https://github.com/react-community/react-native-maps)
    * Using the Google Maps API, this library was used extensively, and is the core visual component of the game. 
* [React Native Switch Toggle](https://github.com/dooboolab/react-native-switch-toggle)
    * Added interactive toggle icons used on the account settings.  


---
---

## Back End Top Mentions - [_Click Here For Server Repo_](https://github.com/RobertTate/ServerCovalenceFinal)

* [Node.js](https://nodejs.org/en/)
    * Because JavaScript is awesome.
* [Express](https://expressjs.com/)
    * Used to run our server and help manage our API routes.
* [MySQL](https://www.mysql.com/)
    * Used to hold a number of relational tables so that our app has information about players, jellies, scores, and game instances. 
* [Node-Schedule](https://github.com/node-schedule/node-schedule)
    * We used this library to implement a number of scheduled events, used to make changes to the database on a daily, weekly, or monthly basis. 
* [Passport](http://www.passportjs.org/)
    * Used for authentication purposes, helping to create secure logins for each player.
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
    * A library used to hash and salt passwords.
* [Mailgun-JS](https://www.npmjs.com/package/mailgun-js)
    * Built a contact form on the front end, and used this libary to set up email servicing, allowing the player to send us emails with any feedback.
---
---