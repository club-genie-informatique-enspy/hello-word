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
  message_uuid: string;
  sender: string;
  receiver: string;
  contenu: string;
  likes: number;
}
interface AnimationPosition {
  top: number;
  left: number;
}