import type { PageLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load: PageLoad = async ({ fetch, params }) => {
  
  const response = await fetch(env.SERVER+'/jobs/all?sort=salary&sort_mode=desc&page=0', {
    headers: {
    'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzA1MTQ3MDg3LCJleHAiOjE3MDUxNTQyODd9.Bg02V7uJHJ5h2uzsyckfRnt5w0scdFtqrAokatdHDM0'}});

  const data = await response.json();

      if (data){
        return {
            data
        }
      
      }
};