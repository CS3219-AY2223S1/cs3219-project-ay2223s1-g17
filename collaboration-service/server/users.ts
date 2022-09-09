import { User, Error } from './types/socket';

const users: User[] = [];

export const addUser = (user: User): User | Error => {
  const { id, roomId } = user;
  let name = user.name;

  if (name) {
    // If name is defined, add the user
    name = name.trim();
    const user = { id, name, roomId };
    users.push(user);
    return user;
  } else {
    return { error: 'Enter a valid name' };
  }
};

export const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export const findUser = (roomId: string): User | undefined =>
  users.find((user) => user.id === roomId);

export const usersInRoom = (roomId: string): User[] =>
  users.filter((user) => user.roomId === roomId);
