import EncryptedStorage from 'react-native-encrypted-storage';

const accessTokenString = 'access_token';
const refreshTokenString = 'refresh_token';

export const getToken = async () => {
  try {
    const value = await EncryptedStorage.getItem(accessTokenString);
    console.log(value)
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log("null token")
    return null;
  }
};

export const setToken = async (token_data) => {
  try {
    access_token = token_data.access_token;
    refresh_token = token_data.refresh_token;
    await EncryptedStorage.setItem(accessTokenString, access_token);
    await EncryptedStorage.setItem(refreshTokenString, refresh_token);
  } catch (e) {
    console.log("token not saved!")
    return null;
  }
};
