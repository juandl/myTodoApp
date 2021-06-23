import TodoModel from './todo.model';

const ObjectId = require('mongoose').Types.ObjectId;

/**
 * GET Get lists of todo
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const MyListTodos = async (req, res, next) => {
  try {
    const { user } = req.params;

    let entity;

    entity = await TodoModel.find({
      user,
    });

    return res.send(entity);
  } catch (err) {
    next({ error: 500, msg: 'Something happen!' });
  }
};

/**
 * POST Create a to-do
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const CreateTodoByUser = async (req, res, next) => {
  try {
    const { user } = req.params;
    const { text } = req.body;

    if (!text) next({ error: 400, msg: 'Text param is required' });

    let entity;

    entity = await TodoModel.create({
      text,
      user,
    });

    return res.send(entity);
  } catch (err) {
    next({ error: 500, msg: 'Something happen!' });
  }
};

/**
 * PUT Update a to-do
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const UpdateTodoById = async (req, res, next) => {
  try {
    const { user, id } = req.params;
    const { text } = req.body;

    if (!text) next({ error: 400, msg: 'Text param is required' });

    let entity;

    entity = await TodoModel.findOneAndUpdate(
      {
        _id: ObjectId(id),
        user,
      },
      {
        text,
      }
    );

    return res.send(entity);
  } catch (err) {
    next({ error: 500, msg: 'Something happen!' });
  }
};

/**
 * DELETE Delete to-do
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const DeleteTodoById = async (req, res, next) => {
  try {
    const { user, id } = req.params;

    await TodoModel.findOneAndDelete({
      _id: ObjectId(id),
      user,
    });

    return res.send('Deleted!');
  } catch (err) {
    next({ error: 500, msg: 'Something happen!' });
  }
};
