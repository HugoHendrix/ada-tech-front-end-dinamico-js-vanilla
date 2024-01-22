const key = "93cd1fb584994c05aeb62a2e4bc6048e";
const apiUrl = `https://crudcrud.com/api/${key}/users`;

async function findAll() {
  try {
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function findById(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function save(user) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
}

function update(user, id) {}

function remove(id) {}