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
Some of the biggest challenges I faced with this project build included: 

  - Handling some large promise chains and rendering the content to the webpage in a timely manner.  
    Solution: Using Promise.All() to handle the asynchronous callbacks.

  - Making up for the shortfalls of my API and tying in another. 
    Solution: Discovered the TMDB API and used that to popular the suggestions

  - Styling:
    Solution: Styling the elements is still unfinished, ideally I would like to add some sort of carousel for the titles and make the "Suggestions" populate in a different way for larger viewports.
  
##Code Snippets
```
//Below is the main search function that occus on form submit 
$THE_FORM.on('submit', function(event) {
    event.preventDefault();
    $SEARCH_RESULTS.empty();
    var titleData = $TITLE.val();
    if (titleData !== "") {
        getServerData(titleData)
            .then(function(data) {
                presentServerData(data);
            })
        }
    if (titleData === "") {
        alert('Please input a movie title.');
            }
        }    
);
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