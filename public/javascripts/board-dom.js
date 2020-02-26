window.onload = () => {
  document.querySelector('#update-board-button').onclick = () => {
    const boardTitle = document.getElementById("boardTitle").value;
    const boardId = document.getElementById("boardId").value;
    document.getElementById('board-details').innerHTML = `
      <form class="auth-form" action="/boards/update/${boardId}" method="POST" id="form-container">
        <br><br>
        <ul>
          <li>Board Name: <input id="title" type="text" name="title" value=${boardTitle}>
        </ul>
        <br><br>
        <button type="submit">Update board</button>
        </form>
        <form class="auth-form" action="/boards/delete/${boardId}" method="POST" id="form-container">
          <button type="submit">Delete board</button>
        </form>`
    };
}