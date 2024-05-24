import Account from "../models/account.js";

export const createAccount = async (username, password) => {
  const newAccount = await Account.create({ username, password });
  return newAccount;
};

export const checkLogin = async (username, password) => {
  const account = await Account.findOne({ where: { username, password } });
  return account;
};
