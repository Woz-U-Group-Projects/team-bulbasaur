export type optional<T> = { [K in keyof T]?: T[K] }

export type commentData = {
  commentId: number;
  postId: number;
  userId: number;
  body: string;
  edited: boolean;
  likes: number;
  dilikes: number;
  createdAt: Date;
  updatedAt: Date;
}

export type commentObject = commentData & {
  author: { userId: number; userName: string; };
}

export type PostData = {
  postId: number;
  userId: number;
  groupId: number|null;
  title: string;
  body: string;
  edited: boolean;
  likes: number;
  dilikes: number;
  private: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type PostObject = PostData & {
  author: { userId: number; userName: string; };
  group: { groupId: number; groupName: string; } | null;
  comments: commentObject[];
}

export type GroupData = {
  groupId: number;
  groupName: string;
  description: string;
  private: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type GroupObject = GroupData & {
  owner: { userId: number; userName: string; };
  admins: ({ userId: number; userName: string; })[];
  members: ({ userId: number; userName: string; })[];
  posts: PostObject[];
}

export type UserData = {
  userId: number;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  admin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UserObject = UserData & {
  posts: PostObject[];
  groups: GroupObject[];
  memberships: GroupObject[];
  friends: ({ userId: number; userName: string; })[];
  incoming: ({ userId: number; userName: string; })[];
  outgoing: ({ userId: number; userName: string; })[];
  reguests: ({ userId: number; userName: string; })[];
  denied: ({ userId: number; userName: string; })[];
  blocked: ({ userId: number; userName: string; })[];
}