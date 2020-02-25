document.querySelector('#update-board-button').onclick = () => {
    const boardTitle = document.getElementById(boardTitle.value)
    document.getElementById('board-details').innerHTML = `
    <form class="auth-form" action="/users/profile/update" method="POST" id="form-container" enctype="multipart/form-data">
      <br><br>
      <li> Board Name: <input id="title" type="text" name="title" value=${boardTitle}>
      <br><br>
      <button type="submit">Update details</button>
      <form class="auth-form" action="/delete/:boardId" method="POST" id="form-container">
        <button type="submit">Delete profile</button>
      </form>
    </form>`
  }