window.onload = () => {
  document.querySelector('#update-board-button').onclick = () => {
    const boardTitle = document.getElementById("boardTitle").value;
    const boardId = document.getElementById("boardId").value;
    document.getElementById('board-details').innerHTML = `
      <form class="auth-form" action="/boards/update/${boardId}" method="POST" id="form-container">
        <span>Board Name: <input id="title" type="text" name="title" value=${boardTitle}></span>
        <button class="btn-primary" type="submit">Update board</button>
        </form>
        <form class="auth-form" action="/boards/delete/${boardId}" method="POST" id="form-container" style="margin-top: 10px">
          <button class="btn-danger" type="submit">Delete board</button>
        </form>`
    };

  document.querySelector('#create-meme-button').onclick = () => {
    document.getElementById('board-details').removeChild(document.getElementById('create-meme-button'));
    const boardTitle = document.getElementById("boardTitle").value;
    const boardId = document.getElementById("boardId").value;
    document.getElementById('board-details').innerHTML = `
    <h1>${boardTitle}</h1>
    <button id="update-board-button">Update Board</button>
    <form class="auth-form" action="/memes/add-meme" method="POST" id="form-container" enctype="multipart/form-data">
      <input type="hidden" id="hidden" value=${boardId} name="boardId">
      <br>
      <input id="newMeme" type="file" name="memeUrl">
      <br>
      <button class="btn-primary" type="submit">Create new meme</button>
    </form>`;
  }
}