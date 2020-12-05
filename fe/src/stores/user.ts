import { writable } from "svelte/store";
import { User } from "types/User";

export const user = writable<User>(null);
