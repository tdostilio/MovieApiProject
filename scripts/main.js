var URL = "http://www.omdbapi.com/";
var API_KEY = "&apikey=1ca32dee";
var POSTER_API = "http://img.omdbapi.com/?i=tt3896198&h=600&apikey=1ca32dee";
var $SEARCH_BUTTON = $('[data-type-submit-button]');
var $THE_FORM = $('[data-movie-search="form"]');
var $TITLE = $('[data-type="movieTitle"]');
// var $GENRE = $('[data-type="genre"]');
var $SEARCH_RESULTS = $('[data-type="search-results"]');
var GLYPHS = '[data-type="expand"]';


$THE_FORM.on('submit', function(event) {
    event.preventDefault();
    $SEARCH_RESULTS.empty();
    var titleData = $TITLE.val();
    console.log(titleData);
    // var actors = $ACTORS.val();
    // var genre = $GENRE.val();
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
        var $expand = $('<span class="glyphicon glyphicon-plus expand" data-type="expand" aria-hidden="true"></span>');
        var titleData = getInfo(key['Title']);
        titleData.then( function(data) {
            console.log(data);
            var $moreContent = $('<div class="more-content hidden"></div>');
            var $plot = $('<p class="movie-plot">'+data['Plot']+'</p>');
            var $rottenTomatoes = $('<p class="rottenTomatoes">Rotten Tomatoes: '+data['Ratings'][1]['Value']+'</p>');
            var $director = $('<p class="director">'+data['Director']+'</p>');
            
            $expand.on('click', function(event) {
                $moreContent.toggleClass("hidden");
            });
            if (parseInt(data['Ratings'][1]['Value']) >= 85) {
                $rottenTomatoes.addClass('good');
            } else if (parseInt(data['Ratings'][1]['Value']) >= 65) {
                $rottenTomatoes.addClass('ok');
            } else if (parseInt(data['Ratings'][1]['Value']) < 65) {
                $rottenTomatoes.addClass('bad');
            }
            $moreContent 
                .append($plot)
                .append($rottenTomatoes)
                .append($director)
            
            $wrapperDiv
                .append($poster)
                .append($movieTitle)
                .append($year)
                .append($expand)
                .append($moreContent)
            $SEARCH_RESULTS
                .append($wrapperDiv)
        })
    }
    )};


function getInfo(title) {
    return $.get((URL+'?t='+title+API_KEY)).then( function(data) {
        return data;
    })
}
