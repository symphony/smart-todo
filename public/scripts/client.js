(() => {
  $(document).ready(() => {
    // user routes
    $('nav').find('form').on('submit', loginSubmit);
    $('#logout').on('click', loggedOut);

    // todo routes
    $('#new-todo').on('submit', newTodo);
    $('.todo-container').on('click', 'article .far', editMode);
    $('.todo-container').on('submit', 'form', submitEdit);
    $('.todo-container').on('click', '.form-check-input', completeTodo);
    $('.todo-container').on('click', '.delete-button', deleteTodo);

    // = initial page load =
    checkLogin();
    loadTodos();
  });

  // == helpers ==
  const editMode = function() {
    $('.editing').removeClass('editing');
    const $todo = $(this).closest('article').addClass('editing');
    const $textarea = $todo.find('form').find('[name="text"]').focus();
    const text = $textarea.val();
    $textarea.val('').val(text);
  };


  const safeHtml = (text) => {
    const safe = document.createElement("div");
    safe.appendChild(document.createTextNode(text));
    return safe.innerHTML;
  };

  const buildTodoCard = (todo) => {
    const htmlString = `
    <article class="todo rounded flex-col flex-1 justify-center" completed="${todo.completed}" alt="${todo.id}">
      <p class="todo-description flex flex-1 justify-between items-center text-base ${todo.completed ? 'complete' : ''} text-center rounded bg-slate-700 m-3 p-4">
      <input ${todo.completed ? 'checked' : ''} type="checkbox" class="form-check-input hover appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" id="flexCheckDefault">
      ${safeHtml(todo.description)}<i class="far fa-edit hover cursor-pointer"></i></p>

      <form>
        <textarea name="text" class="text-base text-center rounded bg-slate-700 m-3 p-4">${safeHtml(todo.description)}</textarea>
        <textarea name="category" class="text-base rounded bg-slate-700 m-4 p-1">${safeHtml(todo.name)}</textarea>
        <button type="submit" class="confirm-edit bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Confirm</button>
        <button type="button" class="delete-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
      </form>
    </article>
  `;
    return htmlString;
  };

  const renderTodos = (todos) => {
    const $container = $('main').find('#categories-container');
    $container.children('.todo-container').hide().find('div').empty(); // reset containers
    for (const todo of todos) {
      $container.find(`#${todo.name}`).show().find('div').prepend(buildTodoCard(todo));
    }
  };

  const loadTodos = () => {
    $.get('/todos')
      .then(renderTodos);
  };

  const renderBasedOnUser = (name) => {
    if (name) {
      const htmlString = `<p class="align-text">${safeHtml(name)}</p>`;
      $('#login').hide();
      $('#logout').show().find('div').append(htmlString);
      $('#new-todo').show().find('h1').text(`Hello, ${name}!`);
      return;
    }
    $('#login').show();
    $('#logout').hide().find('div').text('');
    $('#new-todo').hide().find('h1').text('');
  };

  // == event functions ==
  const newTodo = function(event) {
    event.preventDefault();

    // error handling. text field empty
    if (!$(this).find('input').val()) return console.log('☹️ Text field is empty! ☹️');  // todo set up unintrusive alert

    // sends todo text backend
    $.post('/todos', $(this).serialize())
    // get new todo object back
    .then((todo) => {
      $(this).find('input').val('');
      loadTodos();
    });
  };

  const loginSubmit = function(event) {
    event.preventDefault();
    const $form = $(this);
    const $inputField = $form.find('input');

    // error handling
    if (!$inputField.val().trim()) return; // todo send unintrusive alert

    // login user
    $.post('/users/login', $form.serialize())
      .then((user) => {
        $inputField.val('');
        renderBasedOnUser(user.name);
        loadTodos();
      });
  };

  const loggedOut = () => {
    $.post('/users/logout')
      .then((loggedOut) => {
        if (loggedOut) {
          renderBasedOnUser(null);
          loadTodos();
        }
      });
  };


  const checkLogin = () => {
    $.get('/users')
      .then((user) => {
        renderBasedOnUser(user.name);
      });
  };

  const submitEdit = function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const id = $(this).closest('article').attr("alt");
    $.ajax({ url: "/todos/" + id, data, type: "PUT" })
      .then((res) => {
        loadTodos();
    })
  };

  const completeTodo = function (event) {
    event.stopPropagation();
    event.preventDefault();
    const $todo = $(this).closest("article");
    const data = 'complete=' + !($todo.attr('completed') === 'true');
    const id = $todo.attr('alt');
    $.ajax({ url: "/todos/" + id, data, type: "PATCH" })
      .then((todo) => {

        loadTodos();
    });
  };

  const deleteTodo = function() {
    const $todo = $(this).closest('article');
    const id = $todo.attr('alt');

    $.ajax({url: '/todos/' + id, type: 'DELETE'})
      .then(() => {
        loadTodos();
      });
  };

})();
