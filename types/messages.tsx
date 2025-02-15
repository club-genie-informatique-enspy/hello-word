export interface Message {
    message_uuid: string;
    activity_uuid: string;
    sender: string;
    contenu: string;
    receiver: string;
    nb_vues: number;
    likes: number;
  }