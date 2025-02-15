interface Message {
  message_uuid: string;
  activity_uuid: string;
  sender: string;
  contenu: string;
  receiver: string;
  nb_vues: number;
  likes: number;
}

interface MessageData {
  sender: string;
  receiver: string;
  contenu: string;
  likes: number;
  message_uuid: string;
}

interface AnimationPosition {
  top: number;
  left: number;
}