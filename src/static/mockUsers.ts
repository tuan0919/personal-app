export interface User {
  id: string;
  username: string;
  password: string;
  role: "admin" | "user";
  name: string;
  email: string;
}

export const mockUsers: User[] = [
  {
    id: "1",
    username: "admin",
    password: "123",
    role: "admin",
    name: "Admin User",
    email: "admin@example.com",
  },
  {
    id: "2",
    username: "user",
    password: "123",
    role: "user",
    name: "Regular User",
    email: "user@example.com",
  },
];

export const findUserByCredentials = (
  username: string,
  password: string
): User | undefined => {
  return mockUsers.find(
    (user) => user.username === username && user.password === password
  );
};
