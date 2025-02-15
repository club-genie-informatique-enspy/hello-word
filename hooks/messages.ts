import axios from '@/lib/axios';

interface ToggleLikeParams {
    token: string;
    uuid_message: string;
  }

const toogleLike = async ({ token, uuid_message }: ToggleLikeParams) => {


    console.log("Headers envoyés :", {
        Authorization: `Bearer ${token}`,
      });

    try {
        const response = await axios.post(
          `/message/${uuid_message}/toogle-like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error: any) {
        console.error('Erreur lors du basculement du like :', error);
        throw error;
      }
    };
    
    export default toogleLike;