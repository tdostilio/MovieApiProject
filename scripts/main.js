var URL = "http://www.omdbapi.com/";
var API_KEY = "&apikey=1ca32dee";
var POSTER_API = "http://img.omdbapi.com/?i=tt3896198&h=600&apikey=1ca32dee";
var $SEARCH_BUTTON = $('[data-type-submit-button]');
var $THE_FORM = $('[data-movie-search="form"]');
var $TITLE = $('[data-type="movieTitle"]');
var $ACTORS = $("[data-type='actors']");
var $GENRE = $('[data-type="genre"]');


$THE_FORM.on('submit', function(event) {
    event.preventDefault();
    var titleData = $TITLE.val();
    console.log(titleData);
    var actors = $ACTORS.val();
    var genre = $GENRE.val();
    getServerData(titleData);
});

function getServerData(searchBy) {
    $.get((URL+'?s='+searchBy+API_KEY), function(data) {
        console.log(data);
        return data;
    })
};

function presentServerData() 




// http://www.omdbapi.com/?i=tt3896198&apikey=1ca32dee
// var Data = {
//     s: "",

// }

// function getServerData() {
//     $.get(URL, function(data) {
//     console.log(data);
//     })
// }