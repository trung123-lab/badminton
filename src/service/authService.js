import Account from "../models/account";

export const createAccount = async (username, password) => {
  try {
    const newAccount = await Account.create({ username, password });
    return newAccount;
  } catch (error) {
    throw new Error("Error creating account:", error.message);
  }
};
