import type { GroupedCollabs } from '@/types/GroupedCollabs';
import { groupedProfilesQuery } from '@/utils/supabaseQueries';
import type { Projects, TasksWithProjects } from '@/utils/supabaseQueries';

export const useCollabs = () => {
  const groupedCollabs = ref<GroupedCollabs>({})

  const getProfilesByIds = async (userIds: string[]) => {
    const { data, error } = await groupedProfilesQuery(userIds);

    if (error || !data) {
      console.error('Error fetching profiles:', error);
      return [];
    }
    return data;
  }

  const getGroupedCollabs = async (items: Projects | TasksWithProjects) => {
    const filteredItems = items.filter(item => item.collaborators && item.collaborators.length > 0);

    const promises = filteredItems
      .map(item => getProfilesByIds(item.collaborators))

    const results = await Promise.all(promises);

    filteredItems.forEach((item, index) => {
      groupedCollabs.value[item.id] = results[index]
     })

  }

  return {
    getProfilesByIds,
    getGroupedCollabs,
    groupedCollabs
  };

}
