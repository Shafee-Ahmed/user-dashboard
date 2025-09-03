import { User } from "../types/user";

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  const users: User[] = await res.json();

  const moreUsers: User[] = [];
  const copies = 10;

  for (let i = 0; i < copies; i++) {
    users.forEach((user) => {
      moreUsers.push({
        ...user,
        id: user.id + i * users.length,
        name: `${user.name} ${i + 1}`,
        email: `${user.email.split("@")[0]}+${i + 1}@${user.email.split("@")[1]}`,
      });
    });
  }

  return moreUsers;
}

export async function fetchUserById(id: number): Promise<User | undefined> {
  const users = await fetchUsers();
  return users.find((u) => u.id === id);
}