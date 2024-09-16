"use server";

import { baseUrl } from "@/lib/baseUrl";

export async function getUserById(id: number | string) {
  const response = await fetch(`${baseUrl}/api/user`, {
    method: "POST",
    body: JSON.stringify({ userId: id }),
  });

  if (response.status === 200) {
    const responseBody = await response.json();
    const { user } = responseBody;
    return user;
  }

  return null;
}

export async function getUser() {
  const response = await fetch(`${baseUrl}/api/user`);

  if (response.status === 200) {
    const responseBody = await response.json();
    const { user } = responseBody;
    return user;
  }

  return null;
}

export async function createUser(userId: number | string, role: string) {
  const response = await fetch(`${baseUrl}/api/user/create`, {
    method: "POST",
    body: JSON.stringify({ userId, role }),
  });

  if (response.status === 200) {
    const responseBody = await response.json();
    const { user } = responseBody;
    return user;
  }

  return null;
}
