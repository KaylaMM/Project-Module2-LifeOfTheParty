window.onload = () => {
  document.getElementById('update-button').onclick = () => {
    const username = document.getElementById("hidden1").value;
    const email = document.getElementById("hidden2").value;
    document.getElementById('userDetails').innerHTML = `
    <form class="auth-form" action="/users/profile/update" method="POST" id="form-container" enctype="multipart/form-data">
      <br><br>
      <li>Username: <input id="username" type="text" name="username" value=${username}>
      <li>Email: <input id="email" type="email" name="email" value=${email}></li>
      <li><label for="avatar">Profile Image:</label></li>
      <input id="avatar" type="file" name="avatar">
      <br><br>
      <button type="submit">Update details</button>
      </form>
      <form class="auth-form" action="/users/profile/delete" method="POST" id="form-container">
        <button type="submit">Delete profile</button>
      </form>`
  };
}