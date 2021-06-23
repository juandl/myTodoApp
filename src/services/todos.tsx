import ApiCall from './config';
//Utils
import SessionUser from '../utils/userSession';

/**
 * GET List of todo in base of user
 */
const List = async () => {
  const uid = SessionUser.get();

  const res = await ApiCall.get(`/to-do/${uid}`);
  return res;
};

/**
 * POST Create a to-do
 */
const Create = async (data: ToDoType) => {
  const uid = SessionUser.get();

  const res = await ApiCall.post(`/to-do/${uid}`, data);
  return res;
};

/**
 * PUT Update a to-do
 */
const Update = async (data: ToDoType, _id: string) => {
  const uid = SessionUser.get();

  const res = await ApiCall.put(`/to-do/${uid}/${_id}`, data);
  return res;
};

/**
 * PUT Update a to-do
 */
const Remove = async (_id: string) => {
  const uid = SessionUser.get();

  const res = await ApiCall.delete(`/to-do/${uid}/${_id}`);
  return res;
};

const Todos = {
  List,
  Create,
  Update,
  Remove,
};

export default Todos;
