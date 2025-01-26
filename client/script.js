async function fetchUsers() {
  try {
    // Hämtar data med hjälp av fetch från api:et.
    const response = await fetch('http://localhost:3000/users'); 
    if (!response.ok) {
      // Om det misslylas kastas ett fel. 
      throw new Error('Inget svar från servern');
    }
     // Omvandlar data till json.
    const users = await response.json();
    console.log('Användare:', users);
    // Hämtar list elementet från html.
    const userList = document.querySelector('.user-list');
    //itererar över användarna och skapar en lista med dem. 
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      //skapar och fyller i ett listobjekt med namn, efternamn och användarnamn. Samt skapar en css klass för färgen.
      const userItem = document.createElement('li');
      userItem.className = `user-item ${user.color}`;
      const nameHeading = document.createElement('h2');
      nameHeading.textContent = `${user.firstName} ${user.lastName}`;
      const usernamePara = document.createElement('p');
      usernamePara.textContent = `Username: ${user.username}`;
      
      userItem.appendChild(nameHeading);
      userItem.appendChild(usernamePara);
      userList.appendChild(userItem);
    }
  } catch (error) {
    //loggar i konsolen ifall ett fel uppstår.
    console.error('Error:', error);
  }
}
//När hela dokumentet har laddats körs funktionen fetchUsers.
document.addEventListener('DOMContentLoaded', fetchUsers);