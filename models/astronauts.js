import astronauts from "../libs/data.js";

export async function getAstronauts() {
  return astronauts;
  console.log('Fetching astronauts data...');
}

export async function createAstronaut(astronaut) {
  astronauts.push(astronaut);
  return astronaut;
}

export async function getAstronautById(requestId) {
  const astronaut = astronauts.find(({ id }) => id === requestId);

  if (astronaut) {
    return astronaut;
  }

  throw new Error(`No astronaut with ${requestId} found.`);
}

export async function replaceAstronautById(requestId, astronautReplacement) {
  const index = astronauts.findIndex(({ id }) => id === requestId);
  console.log("I", index, requestId);
  if (index === -1) {
    throw new Error(`No astronaut with ID ${requestId} found.`);
  }

  astronauts[index] = astronautReplacement;

  return astronauts[index];
}

export async function deleteAstronautById(requestId) {
  const index = astronauts.findIndex(({ id }) => id === requestId);

  if (index === -1) {
    throw new Error(`No astronaut with ID ${requestId} found.`);
  }
  const deleted = astronauts[index];
  astronauts.splice(index, 1);
  return deleted;
}

export async function updateAstronautById(requestId, updates) {
  console.log(requestId, updates, astronauts);
  const index = astronauts.findIndex(({ id }) => id === requestId);
  console.log("incex", index);
  if (index === -1) {
    throw new Error(`No astronaut with ID ${requestId} found.`);
  }

  astronauts[index] = { ...astronauts[index], ...updates };

  return astronauts[index];
}

export async function getAstronautsByName(search) {
  return astronauts.filter(
    ({ firstName, lastName }) =>
      firstName.toLowerCase().includes(search.toLowerCase()) ||
      lastName.toLowerCase().includes(search.toLowerCase())
  );
}
