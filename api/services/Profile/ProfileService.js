
//models
import UserProfileCad from '../../models/sql/Profile/UserProfileCad';



class ProfileService {

  static async getProfile(fkUser) {
    try {
      if (!fkUser) {
        return null;
      }

      const professional = await UserProfileCad.findOne({
        where: {
          fkUser,
        },
        raw:true
      });

      return professional || null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }  

  static async createUpdateProfile(profile, professional, fkUser) {
    try {
      //check if user exists
      const existingUser = await ProfileService.getProfile(fkUser);

      if (!existingUser) {
        const profileCad = UserProfileCad.create({profile, professional, fkUser});
        return profileCad ? profileCad : null;
      }

      const profileCad = UserProfileCad.update({profile, professional, fkUser}, {where:{
        id:existingUser.id
      }});
      return profileCad ? profileCad : null;


    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  
}

export default ProfileService;
