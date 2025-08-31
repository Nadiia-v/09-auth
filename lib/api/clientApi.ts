import { fetchNotesResponse, NewNote, Note } from "@/types/note";
import nextServer from "./api";
import { EditUser, User } from "@/types/user";
import { LoginRequest, RegisterRequest } from "@/types/auth";
import { ServerBoolResponse } from "@/types/server";
import axios from "axios";

export async function fetchNotes(
  searchText: string,
  page: number,
  tag?: string
): Promise<fetchNotesResponse> {
  const res = await nextServer.get<fetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      ...(searchText && { search: searchText }),
      ...(tag && { tag }),
    },
  });
  return res.data;
}

export const getSingleNote = async (id: string) => {
  const res = await nextServer.get<Note>(`/notes/${id}`);

  return res.data;
};

export async function createNote(newNote: NewNote) {
  const res = await nextServer.post<Note>("/notes", newNote);
  return res.data;
}

export async function deleteNote(id: string) {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
  return res.data;
}

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const logOut = async () => {
  await nextServer.post<ServerBoolResponse>(`/auth/logout`);
};

export const checkSession = async (): Promise<boolean> => {
  try {
    const res = await nextServer.get<User | null>("/auth/session");
    return !!res.data;
  } catch {
    return false;
  }
};

export const getMe = async () => {
  try {
    const { data } = await nextServer.get<User>("/users/me");
    return data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 401) return null;
    throw e;
  }
};

export const editUser = async (user: EditUser): Promise<User> => {
  const response = await nextServer.patch<User>("/users/me", user);
  return response.data;
};
