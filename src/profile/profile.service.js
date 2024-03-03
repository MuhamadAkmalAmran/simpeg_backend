import ResponseError from '../utils/response-error.js';
import { updateProfileValidation } from '../validation/profile-validation.js';
import validate from '../validation/validation.js';
import { editProfile, findAllProfilesByUser, findProfileByUser } from './profile.repository.js';

const getAllProfiles = async (userId) => {
  const profiles = await findAllProfilesByUser(userId);
  return profiles;
};

const updateProfile = async (profileData, userId) => {
  const profileValidation = await validate(updateProfileValidation, profileData);
  const profileByUser = await findProfileByUser(userId);

  if (!profileByUser) {
    throw new ResponseError(404, 'Profile not found');
  }
  const profile = await editProfile(profileValidation, userId);
  return profile;
};

export {
  getAllProfiles,
  updateProfile,
};
