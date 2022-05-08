$(document).ready(() => {


  $('#new-tweet').on('submit', newTodo);
});

const fetchMoviesForUser = function () {
  const movieOptions = {
    method: "GET",
    url: "https://movie-database-alternative.p.rapidapi.com/",
    params: { s: "Avengers Endgame", r: "json", page: "1" },
    headers: {
      "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
      "X-RapidAPI-Key": "***REMOVED***",
    },
  };
  axios.request(movieOptions)
    .then((response) => {
      console.log("data", response.data);

    })
    .catch ((err) => {
      console.log("err", err)
  })
};

const fetchMusicForUser = function(text) {
  const options = {
    method: 'get',
    url: 'https://shazam.p.rapidapi.com/search',
    data: { term: text, locale: "en-US", offset: "0", limit: "5" },
    headers: {
      "X-RapidAPI-Host": "shazam.p.rapidapi.com",
      "X-RapidAPI-Key": "***REMOVED***",
    }
  };

  return $.ajax(options)
    .then((res) => {
      if (res.hits.tracks.length > 1) return "Music";
    })
    .catch((err) => {
      console.error(err);
    });
};

const findCategory = (text) => {
  return Promise.any([
    fetchMusicForUser(text),
    fetchMoviesForUser(text),
  ])
  .then((category) => {
    return category || 'Unlabeled';
  })
  .catch((err) => {
    console.error(err);
  });
}

const newTodo = (event) => {
  event.preventDefault();
  const $form = $(this).closest('form');
  const $inputField = $form.find('input');
  const description = $inputField.val() || "Avengers Endgame";
  // error handling. text field empty

  findCategory(description)
    .then((category) => {
      const user_id = 1; // need to get user id
    $.post('/todos', {user_id, description, category})
    $.get('/todos');
  });
};