export const sampleChats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "1",
    lastMessage: "Hello, how are you?",
    groupChat: false,
    sameSender: false,
    members: ["1", "2"],
  },

  {
    avatar: [
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
    ],
    name: "John Singh",
    _id: "2",
    lastMessage: "Hello, how are you?",
    groupChat: true,
    sameSender: false,
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
    ],
    name: "John Singh",
    _id: "2",
    lastMessage: "Hello, how are you?",
    groupChat: true,
    sameSender: false,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    name: "John Doe",
    _id: "1",
  },
  {
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    name: "John Doe",
    _id: "2",
  },
];

export const sampleNotifications = [
  {
    sender: {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "John Doe",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "John Doe",
    },
    _id: "2",
  },
];

export const sampleMessage = [
  {
    attachments: [],
    content: "Hello, how are you?",
    _id: "1",
    sender: {
      _id: "he",
      name: "John Doe",
    },
    chat: "chatId1",
    createdAt: "2021-01-01T00:00:00.000Z",
  },
  {
    attachments: [
      {
        public_id: "asdsad",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "",
    _id: "2",
    sender: {
      _id: "user._id",
      name: "John Doe",
    },
    chat: "chatId",
    createdAt: "2021-01-01T00:00:00.000Z",
  },
];

export const dashboardData = {
  users: [
    {
      name: "John Doe",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "1",
      username: "johndoe",
      friends: 10,
      groups: 10,
    },
    {
      name: "John Doe",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "2",
      username: "johndoe",
      friends: 10,
      groups: 10,
    },
  ],
  chats: [
    {
      name: "Lakkadbagga",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "1",
      groupChat: false,
      members: [
        {
          _id: "1",
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
        },
        {
          _id: "2",
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      totalMessages: 10,
      totalMembers: 10,
      creator: {
        name: "John Doe",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
    {
      name: "Lakkadbagga",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "2",
      groupChat: false,
      members: [
        {
          _id: "1",
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
        },
        {
          _id: "2",
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      totalMessages: 10,
      totalMembers: 10,
      creator: {
        name: "John Doe",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
  ],
  messages: [
    {
      attachments: [],
      content: "Hello, how are you?",
      _id: "1",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "John Doe",
      },
      groupChat: false,
      chat: "chatId1",
      createdAt: "2021-01-01T00:00:00.000Z",
    },
    {
      attachments: [
        {
          public_id: "asdsad",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "",
      _id: "2",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "John Doe",
      },
      groupChat: true,
      chat: "chatId",
      createdAt: "2021-01-01T00:00:00.000Z",
    },
  ],
};
