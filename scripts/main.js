var URL = "http://www.omdbapi.com/";
var API_KEY = config.movieKey;
var POSTER_API = "http://img.omdbapi.com/?i=tt3896198&h=600&apikey="+API_KEY;
var $SEARCH_BUTTON = $('[data-type-submit-button]');
var $THE_FORM = $('[data-movie-search="form"]');
var $TITLE = $('[data-type="movieTitle"]');
var $SEARCH_RESULTS = $('[data-type="search-results"]');
var GLYPHS = '[data-type="expand"]';
var TMDBKEY = config.TMDBKEY;


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

function getServerData(searchBy) {
    return $.get((URL+'?s='+searchBy+'&type=movie'+API_KEY));
};

function presentServerData(obj) {
    obj['Search'].forEach(function(key) {
        console.log(key);
        var $wrapperDiv = $('<div class="wrapper-div">');
        if (key['Poster'] !== "N/A") {
            var $poster = $('<img src='+key['Poster']+'>');
        } else {
            var $poster = $('<p class="unavailable">Movie Poster Unavailable</p>');
        }
        var $movieTitle = $('<h4 class="movie-title">'+ key['Title']+'</h4>');
        var $year = $('<p class="movie-year">'+key['Year']+'</p>');
        var $buttons = $('<div class="additional" data-type="additional"></div>')
        var $expand = $('<span class="glyphicon glyphicon-plus expand" data-type="expand" aria-hidden="true"></span>');
        var $suggestion =$('<button type="submit" class="btn btn-default similar" data-type-suggestion-button>Similar</button>');
        var titleData = getInfo(URL,key['Title'],key['Year']);
        titleData.then( function(data) {
            var $api1title = data['Title'];
            getInfoMDB($api1title)
                .then(function(data) {
                    data.forEach(function(obj) {
                        if (obj['title'] === $api1title) {
                            var $movieID = obj['id'];
                            getSimilarMovies($movieID)
                                .then(function(data) {
                                    data.forEach(function(obj) {
                                        $wrapperDiv
                                            .append(createSimilarHTML(obj))
                                    })
                                })
                                
                        }
                    })
                })
                
            var $moreContent = $('<div class="more-content hidden"></div>');
            var $plot = $('<p class="movie-plot">'+data['Plot']+'</p>');
            if (data['Ratings'][1]) {
            var $rottenTomatoes = $('<p class="rottenTomatoes">Rotten Tomatoes: '+data['Ratings'][1]['Value']+'</p>');
            };
            var $director = $('<p class="director">Director: '+data['Director']+'</p>');
            var $actors = $('<p class="actors">Actors: '+data['Actors']+'</p>');
            var $runtime = $('<p class="runtime">Runtime: '+data['Runtime']+'</p>');
            var $rating = $('<p class="rating">Rated: '+data['Rated']+'</p>');
            var $boxOffice = $('<p class="box-office">Box Office: '+data['BoxOffice']+'</p>');
            var $awards = $('<p class="awards">Awards: '+data['Awards']+'</p>');

        
            $expand.on('click', function(event) {
                $moreContent.toggleClass("hidden");
                $expand.toggleClass("glyphicon-minus");
            });

            $suggestion.on('click',function(event) {
                $wrapperDiv.find(".results-container").toggleClass("hidden");
            })

        

            if ($rottenTomatoes) {
                if (parseInt(data['Ratings'][1]['Value']) >= 85) {
                    $rottenTomatoes.addClass('good');
                } else if (parseInt(data['Ratings'][1]['Value']) >= 65) {
                    $rottenTomatoes.addClass('ok');
                } else if (parseInt(data['Ratings'][1]['Value']) < 65) {
                    $rottenTomatoes.addClass('bad');
                }
            }
            $buttons
                .append($expand)
                .append($suggestion)

            $moreContent 
                .append($plot)
                .append($rottenTomatoes)
                .append($director)
                .append($actors)
                .append($runtime)
                .append($rating)
                .append($boxOffice)
                .append($awards)
            
            $wrapperDiv
                .append($poster)
                .append($movieTitle)
                .append($year)
                .append($buttons)
                .append($moreContent)


            $SEARCH_RESULTS
                .append($wrapperDiv)
        })
    }
    )};


function getInfo(url,title,year) {
    return $.get((url+'?t='+title+'&y='+year+API_KEY)).then( function(data) {
        return data;
    })
}

// https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=<<api_key>>&language=en-US&page=1


function getInfoMDB(title) {
    return $.get('https://api.themoviedb.org/3/search/movie?api_key='+TMDBKEY+'&query='+title).then( function(data) {
        return (data.results)
    })
}


function getSimilarMovies(movieId) {
    return $.get('https://api.themoviedb.org/3/movie/'+movieId+'/recommendations?api_key=fd9c86bb058dc10dab45ea467152da3b&language=en-US&page=1').then( function(data) {
        return(data.results);
        });
    };

function presentSimilarTitles(obj) {
    obj.results.forEach(function(key) {
       return key
    })
}

function createSimilarHTML(obj) {
    var $resultscontainer = $('<div class="results-container hidden"></div>');
    var $poster = $('<img>',{
        "src": "https://image.tmdb.org/t/p/w500"+obj.poster_path,
        "class": "similar-movie-poster",
        "data-type": "similar-movie-poster"
    })
    var $title = $('<p class="related-title">'+obj.title+'</p>');
    var $release = $('<p class="release-date">'+(obj.release_date).substring(0,4)+'</p>');
    var $relatedPlot = $('<p class="related-plot">'+obj.overview+'</p>');
    

    $resultscontainer
        .append($poster)
        .append($title)
        .append($release)
        .append($relatedPlot)

    return $resultscontainer
}

