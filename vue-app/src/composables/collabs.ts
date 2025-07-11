import { groupedProfilesQuery } from '@/utils/supabaseQueries';
export const useCollabs = () => {

  const getProfilesByIds = async (userIds: string[]) => {
    const { data, error } = await groupedProfilesQuery(userIds);

    if (error || !data) {
      console.error('Error fetching profiles:', error);
      return [];
    }
    return data;
  }

  return {
    getProfilesByIds,
  };

}
