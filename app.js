import express from "express";

import {
  deleteAstronautById,
  updateAstronautById,
  getAstronautsByName,
  replaceAstronautById,
  getAstronauts,
  createAstronaut,
  getAstronautById,
} from "./models/astronauts.js";

const app = express()
const PORT = 3000

app.listen(PORT, () => {
console.log(`Local host: http://localhost: ${PORT}`)
})

app.use(express.json())

/* 

All json responses for this tasks should follow the pattern:

res.json({
  "success": boolean,
  "payload": returnedData
})

*/

// Task 1

/* Write a request handler to return the correct response when a `GET` request is received to `/astronauts`. Choose the appropriate 
function from the imported functions at the top of the `app.js` to get your data. */

app.get('/astronauts', async (req, res) => {
  try {
    const astronauts = await getAstronauts(); //gets ast data 
    res.status(200).json(astronauts);// transfers the data to the "resp"
  } catch (error) { // protocol if an error occures 
    console.error('Error fetching astronauts:', error);
    res.status(500).json({ error: 'Failed to fetch astronauts' });
  }
});

// Task 2

/* Write a request handler to return the correct response and perform the correct action when a `POST` request is received to 
`/astronauts`. Choose the appropriate function from the imported functions at the top of the `app.js` to perform the action. */

app.post('/astronauts', async (req, res) => {
  const { id, firstName, lastName, rank, suitSize, helmetSize, specialSkill, dob, missions } = req.body;

  try {
    const newAstronaut = {
      id,
      firstName,
      lastName,
      rank,
      suitSize,
      helmetSize,
      specialSkill,
      dob,
      missions
    };
    await createAstronaut(newAstronaut);
    res.status(201).json({ message: 'Astronaut created successfully', astronaut: newAstronaut });
  } catch (error) {
    console.error('Error creating astronaut:', error);
    res.status(500).json({ error: 'Failed to create astronaut' });
  }
});

// Task 3

/* Write the request handler to return the data from the function getAstronautById. Have this handler listen to requests at the 
appropriate path. */

app.get('/astronauts/:id', async (req, res) => {
  const { id } = req.params; // destructuring assignment - expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.
                            // ID is extracted from req.params using destructuring.
  try {
    const astronaut = await getAstronautById(id);

    if (!astronaut) {
      return res.status(404).json({ error: 'Astronaut not found' }); // if no astronaut is found, a 404 status + error message is returned.
    }

    res.status(200).json(astronaut);

  } catch (error) { // if there are any other errors -  500 status with an error message is returned.
    console.error('Error finding the astronaut:', error);
    res.status(500).json({ error: 'Failed to fetch astronaut' });
  }
});

// Task 4

/* Write the request handler to perform the action and return the data from the function replaceAstronautById. Have this handler 
listen to requests at the appropriate path. */

app.put('/astronauts/:id', async (req, res) => {
  const { id } = req.params; // extract ID
  const astronautToPut = req.body; //  new astronaut data from the request

  try {
    const replacedAstronaut = await replaceAstronautById(id, astronautToPut);

    if (!replacedAstronaut) {
      return res.status(404).json({ error: 'Astronaut not found' });
    }

    res.status(200).json({ success: true, payload: replacedAstronaut });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to replace astronaut by ID' });
  }
});

// Task 5

/* Write the request handler to perform the action and return the data from the function deleteAstronautById. Have this handler 
listen to requests at the appropriate path. */

app.delete('/astronauts/:id', async () => {
  const { id } = req.params; // Extract ID from the request parameters

  try {
    const deletedAstronaut = await deleteAstronautById(id);

    if (!deletedAstronaut) {
      return res.status(404).json({ error: 'Astronaut not found' });
    }

    res.status(200).json({ success: true, payload: deletedAstronaut });
  } catch (error) {
    console.error('Error deleting astronaut:', error);
    res.status(500).json({ error: 'Failed to delete astronaut' });
  }
});

// Task 6

/* Write the request handler to perform the action and return the data from the function updateAstronautById. Have this handler 
listen to requests at the appropriate path. */

export default app;
