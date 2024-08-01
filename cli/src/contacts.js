import fs from "node:fs/promises";
import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const contactsPath = path.join(__dirname, "db", "contacts.json");

// const currentWorkingDir = process.cwd();
// const contactsPath = path.join(currentWorkingDir, "src", "db", "contacts.json");

// console.log("currentWorkingDir :>> ", currentWorkingDir);
// console.log("contactsPath :>> ", contactsPath);
// console.log("__dirname :>> ", __dirname);

const readContacts = async () => {
  const data = await fs.readFile(contactsPath, { encoding: "utf8" });
  return JSON.parse(data);
};

const writeContacts = (contacts) => {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
};

export const listContacts = async () => {
  const contacts = await readContacts();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    return null;
  }

  return contact;
};

export const addContact = async (name, email, phone) => {
  const contacts = await readContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };

  contacts.push(newContact);
  await writeContacts(contacts);

  return newContact;
};

export const updateContactById = async (contactId, contact) => {
  const contacts = await readContacts();
  const contactIdx = contacts.findIndex((contact) => contact.id === contactId);

  if (contactIdx === -1) return null;

  const updatedContact = { ...contact, contactId };
  contacts[contactIdx] = updatedContact;
  await writeContacts(contacts);

  return updatedContact;
};

export const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const contactIdx = contacts.findIndex((contact) => contact.id === contactId);

  if (contactIdx === -1) return null;

  const removedContact = contacts[contactIdx];
  contacts.splice(contactIdx, 1);

  // const removedContact = contacts.splice(contactIdx, 1)[0];
  await writeContacts(contacts);

  return removedContact;
};
