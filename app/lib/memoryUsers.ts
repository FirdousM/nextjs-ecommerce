// app/lib/memoryUsers.ts
export interface MockDBUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const users: MockDBUser[] = [
  { id: "1", name: "Firdous", email: "firdous@example.com", password: "123456" }
];
