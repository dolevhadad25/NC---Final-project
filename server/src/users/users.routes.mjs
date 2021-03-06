import { Router } from "express";

import {
  getAllUsers,
  createNewUser,
  getUserById,
  editUser,
  deleteUser,
  getUserByUsernameAndPassword,
} from "./users.data.mjs";

export const UsersRouters = Router();

// READ - Get all Users
UsersRouters.get("/", async (req, res) => {
  res.send(await getAllUsers());
});

// CREATE - Create a new user
UsersRouters.post("/post", async (req, res) => {
  res.send(await createNewUser(req.body));
});

// READ - Get user by ID
UsersRouters.get("/:id", async (req, res) => {
  res.send(await getUserById(req.params.id));
});

// check username and password
UsersRouters.post("/", async (req, res) => {
  res.send(await getUserByUsernameAndPassword(req.body));
});

// UPDATE - Update user by ID
UsersRouters.put("/:id", async (req, res) => {
  res.send(await editUser(req.params.id, req.body));
});

// DELETE - Delete user by ID
UsersRouters.delete("/:id", async (req, res) => {
  await deleteUser(req.params.id);
  res.send("ok");
});
