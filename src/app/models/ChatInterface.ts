export interface ChatInterface {
  id: string;
  friendshipId: string;
  otherUser: {
    id: string;
    name: string;
    Course: {
      name: string;
    };
  };
}
