//import { fifaData } from './fifa.js';
const fifaData=require('./fifa.js');
// console.log(fifaData);


// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */
let sample_data= [
    {
      "Year": 1930,
      "Datetime": "13 Jul 1930 - 15:00",
      "Stage": "Group 1",
      "Stadium": "Pocitos",
      "City": "Montevideo",
      "Home Team Name": "France",
      "Home Team Goals": 4,
      "Away Team Goals": 1,
      "Away Team Name": "Mexico",
      "Win conditions": "",
      "Attendance": 4444,
      "Half-time Home Goals": 3,
      "Half-time Away Goals": 0,
      "Referee": "LOMBARDI Domingo (URU)",
      "Assistant 1": "CRISTOPHE Henry (BEL)",
      "Assistant 2": "REGO Gilberto (BRA)",
      "RoundID": 201,
      "MatchID": 1096,
      "Home Team Initials": "FRA",
      "Away Team Initials": "MEX"
    }];
//let home_team =fifaData.map(x=>x["Home Team Name"]);
//console.log(home_team);
/*let Away_team=[];
let home_team_goals=[];
let Away_team_goals=[];
let Winner_team=[];
for (let i = 0; i < fifaData.length; i++) {
    if (fifaData[i].Year == 2014) {
        home_team.push(fifaData[i]["Home Team Name"]);
        Away_team.push(fifaData[i]["Away Team Name"]);
        home_team_goals.push(fifaData[i]["Home Team Goals"]);
        Away_team_goals.push(fifaData[i]["Away Team Goals"]);
        if(fifaData[i]["Home Team Goals"]>fifaData[i]["Away Team Goals"]){
            Winner_team.push(fifaData[i]["Home Team Name"]);
        }
        else{
            Winner_team.push(fifaData[i]["Away Team Name"]);
        }

    }


}


//console.log("Home Team Name "+home_team);
//console.log("Away Team Name "+Away_team);
//console.log("home Team goals "+home_team_goals);
// console.log("Away Team goals "+Away_team_goals);
// console.log("winner team "+Winner_team);
*/
let home_team_name = fifaData.filter((team) => {
    if (team["Year"] === 2014 && team["Stage"] === "Final") {
      console.log(team["Home Team Name"]);
    }
  });
  let Away_team_name = fifaData.filter((team) => {
    if (team["Year"] === 2014 && team["Stage"] === "Final") {
      console.log(team["Away Team Name"]);
    }
  });
  let home_team_goals = fifaData.filter((team) => {
    if (team["Year"] === 2014 && team["Stage"] === "Final") {
      console.log(team["Home Team Goals"]);
    }
  });
  let Away_team_goals = fifaData.filter((team) => {
    if (team["Year"] === 2014 && team["Stage"] === "Final") {
      console.log(team["Away Team Goals"]);
    }
  });

  let winner=fifaData.filter((team)=>{
    if (team["Year"] === 2014 && team["Stage"] === "Final") {
        if(home_team_goals>Away_team_goals){
            console.log(team["Home Team Name"]);
        }
        else{
            console.log(team["Away Team Name"]);
        }
        
      }
  });


      //  console.log("Away Team Name "+year["Away Team Name"]);

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(fifaData){

    /* code here */
return fifaData.filter(data =>data.Stage ==="Final");
    
    };
console.log(getFinals(fifaData));

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(callback) {
  //  const data = callback(fifaData);
    return callback.map( data1 =>data1.Year);
    
};
console.log(getYears(getFinals(fifaData)));

/* Task 5: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(callback) {

    /* code here */
 //   return getFinals(fifaData)ma
 
 return callback.map(winner=>{
     if(winner["Home Team Goals"]>winner["Away Team Goals"]){
         return winner["Home Team Name"];
     }
     else{
         return winner["Away Team Name"];
     }
 } )
 

 };

console.log(getWinners(getFinals(fifaData)));

/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(getyears,getcountry) {
    
    return getyears.map((year,index)=>`In ${year}, ${getcountry[index]} won the world cup!`);

};

console.log(
    getWinnersByYear(
      getWinners(getFinals(fifaData)),
      getYears(getFinals(fifaData))
    )
  );



/* Task 7: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {
    const totalWins = data.reduce((total, obj) => {
        const winCondition = (obj["Home Team Goals"] > obj["Away Team Goals"] && teamInitials === obj["Home Team Initials"]) || 
        (obj["Away Team Goals"] > obj["Home Team Goals"] && teamInitials === obj["Away Team Initials"])

        return winCondition  ? total + 1 : total 
    }, 0)
    return totalWins
}

console.log(getCountryWins(getFinals(fifaData), "BRA"));

/* Task 8: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {

    const awayGoals = data.reduce((total, obj) => {
        return obj["Away Team Goals"] ? total + obj["Away Team Goals"] : total
    }, 0)

    const homeGoals = data.reduce((total, obj) => {
        return obj["Home Team Goals"] ? total + obj["Home Team Goals"] : total
    }, 0)

    const totalGames = data.length
    const homeTeamAverage = homeGoals / totalGames
    const awayTeamAverage = awayGoals / totalGames
    return `The home team average is: ${homeTeamAverage} goals per match, while the away team average is: ${awayTeamAverage} goals per match` 

};

console.log(getAverageGoals(fifaData));



/// STRETCH 🥅 //

/* STRETCH 1: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

};

getGoals();


/* STRETCH 2: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
