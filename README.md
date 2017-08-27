## Overview: The Movie Wizard is a web application that takes a movie title and presents relevant infomation along with suggestions for other titles you may like.  
  
##Languages used: 
  - HTML5
  - CSS
  - JavaScript(jQuery)
  
  APIs:
  - OMDB
  - TMDB
  
##MVP (Minimum Viable Product): 
Initial MVP
  - add input form
  - Connect OMDB API
  - get movie titles and posters from search
  - mobile first resposive design
  
Strech Goals
  - add suggestions button
  - add support for different media types i.e. video games
  - implement some form of AI to suggest titles 
  - add new or upcoming titles
  
Challenges & Solutions:
Some of the biggest challenges we faced with this project build included: 

  The first big challenge was finding a suitable API for our project goal. All the free APIs we found were significantly flawed, and all of the decent ones were private or required partnership. The one we settled on was a free API from Dice.com which successfully pulled a lot of data, however it lacked an address for the company or job posting... Due to time constraints we were unable to wait for a premium API so we invented a work-around. We decided to circumvent this problem by adding an intermediary step where we text searched the company title along with the zipcode the user entered into google maps and a keyword "corporate" and pulled the coordinates of the first result. The use of "corporate" in the search was to eliminate addresses returned from fast food chains or local retail offices. This was tested using Chik Fil A in Atlanta and the address queried moved from a location on Roswell road to the company headquarters where the job was posted. We experienced a ~10% data loss using this method as some companies were unable to be found due to various reasons, however the location information we did pull was more accurate. 

  Some of the technical challenges lay in the returning of large promise chains where we were unable to get usuable data until everything had run. Using return Promise.all(...) was our solution and allowed the functions to complete all promises before returning the data we sought. 

  Another technical challenge was getting the job posting results in a usuable form. The DICE API was limited to 50 results per page,and in broad queries with job postings numbering in the thousands we needed a solution. We decided to use a for-loop from 1 to Math.ceil(jobCount/50) to loop through every page and push all the data into an array we could manipulate in later functions.

  The last big challenge, and ultimately the greatest challenge we faced was the quota limit on queries from Google Maps on their Web API. At a limit of 2,500 requests per day we found ourselves locked out on our very first day of testing. To help with this problem we decided to limit search results to 250 queries to give ourselves room to test. Anything less than 250 would fail to populate a heatmap of any significance, and anything more would reduce our ability to test. If we intended to take this product live and allow public use we would need to pay for a premium membership. Another possible solution involves caching data for popular searches in major cities.
  
##Code Snippets
```
//Below is the main search function that occus on form submit 
$FORM.on('submit', function(event) {
    event.preventDefault();
    $.getScript("pace/pace.js", function(){
        Pace.start();
    });
    console.log('hello');
    getServerData($CRITERIA.val(),$LOCATION.val(),$AGE.val())
        .then(function(data) {
        return getDataArray(data)})
                .then(function(data) {
                    //Returns array of company names
                    return (getCompanyName(data))
                })
                .then(function(data) {
                    //Gets Coordinate Pairs 
                    return getCoordinates(data, $LOCATION.val());
                })
                .then(function(data) {
                    return data;
                })
                .then(function(data) {
                    //Stores coordinate Array to Local Storage
                    localStorage.setItem('coordinateArray',JSON.stringify(data));

                    // FADES OUT AND CALLS MAP.HTML 
                    $container.fadeOut("slow", function(){
                        window.location.replace("map.html");
                    });  
                })
});
```

```
//This is our Get Coordinates Function  
function getCoordinates(array, zipcode){
    return convertZiptoCity(zipcode)
    .then (function(city) {
        var shortenedArray = [];
        //Shortens query results to a maximum of 250 results
        if (array.length > 250) {
            var subtractor = array.length - 250;
            shortenedArray = array.splice(subtractor);
        }
        else {
            shortenedArray = array;
        }
        var coordinatesPromisesArray = shortenedArray.map( function(item) {
          //Using this shortened array - retrieve the coordinates of the first result matching the below query and map the coordinates to a new array
                return $.get(GMAPS_URL+item+"corporate"+city+'&key='+GOOGLE_MAPS_API)
                    .then (function(data) {
                        return data.results})
                    .then (function(data) {
                        if (data[0]) {
                            return data[0].geometry.location;
                        } else {
                            return null;
                        }
                    }).catch(console.log.bind(console));
            });
            //Removes all undefined values 
            return Promise.all(coordinatesPromisesArray)
            .then(function(dataArray) {
                return dataArray.filter(function(item) {
                    return item;
                });
            });
        });
}
```
##Screenshots
![Alt text](images/home-page.png?raw=true)
This is a shot of the home page for the application. The form excepts a location you desire to move to, a job you would like, and a time frame that the job was listed in. 

![Alt text](images/atlanta.png?raw=true)
This is a shot of the map page. A google map is displayed with a heat map overlay indicating areas of high job concentration. This allows the user to see where the best jobs are located to find a place to stay. 

##YouTube Video
https://youtu.be/b0IKJUky6xU

##Desired Contributions: We love anyone who is willing to contibute to our project. Here are some features we have not implemented that would make the site better.
  - unlimited geocoding API
  - integration with airBnB to display places to rent
  - allow recruiter information to be gather on clicking a heatmap     object

##Contributing
  1. Fork it
  2. Create a new feature branch(named after your intended feature):    git checkout -b new-feature-name
  3. Commit your changes: git commit -am 'added the feature!'
  4. Push to your feature branch: git push origin new-feature-name
  5. Submit a pull request!
  6. We will review and get back to you!
  
##Project History
Start: 07/27/17
End: 08/1/17