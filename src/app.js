const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4');
// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const likes = 0

  const project = {
    id: uuid(),
    title,
    url,
    techs,
    likes

  }

  repositories.push(project)
  console.log(repositories)
  return response.json(project);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs, likes } = request.body;
  const RepositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (RepositoryIndex < 0) {
    return response.status(400).json({ error: 'project not found' })
  }

  const project = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[RepositoryIndex] = project

  return response.json(project);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const RepositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (RepositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found' })
  }

  repositories.splice(RepositoryIndex, 1)
  return response.status(204).send();
});

app.post("/repositories/:id/likes", (request, response) => {
  const { id } = request.params;

  const RepositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (RepositoryIndex < 0) {
    return response.status(400).json({ error: 'project not found' })
  }

  const repository = repositories.find(repository => repository.id === id)

  const project = {
    id: repository.id,
    title: repository.title,
    url: repository.url,
    techs: repository.techs,
    likes: repository.likes + 1
  }

  repositories[RepositoryIndex] = project

  return response.json(project);
});

module.exports = app;
