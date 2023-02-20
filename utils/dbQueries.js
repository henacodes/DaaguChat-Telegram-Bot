import User from "../models/users";

export const findUser = async (id) => {
  try {
    const user = await User.findOne({ userId: id });
    return user;
  } catch (error) {
    return error;
  }
};

export const setUsername = async (username) => {
  try {
    const user = await User.findOne({ userName: username });
    return user;
  } catch (error) {
    return error;
  }
};

export const setAge = async (id, age) => {
  if (age > 80 || age < 10) {
    return "Invalid age number";
  }
  try {
    const user = await User.findOne({ userId: id });
    user.age = age;
    await user.save();
    return user;
  } catch (error) {
    return error;
  }
};
export const setGender = async (id, gender) => {
  if (gender.toLowerCase() != "male" || gender.toLowerCase() != "female") {
    return "Sorry, You have entered invalid gender. We only accept 'male' and female ";
  }
  try {
    const user = await User.findOne({ userId: id });
    user.gender = gender.toLowerCase();
    await user.save();
    return user;
  } catch (error) {
    return error;
  }
};

export const setCountry = async (id, country) => {
  try {
    const user = await User.findOne({ userId: id });
    user.country = country;
    await user.save();
    return user;
  } catch (error) {
    return error;
  }
};
