export function defaultChats() {
  return [
    {
      id: 1,
      name: 'Alice Johnson',
      avatar: 'AJ',
      color: '#6366f1',
      lastMsg: 'Hey! How are you doing?',
      time: '10:42 AM',
      unread: 2,
      messages: [
        { id: 1, from: 'them', text: 'Hey! How are you doing?', time: '10:40 AM' },
        { id: 2, from: 'them', text: "Let me know when you're free to catch up!", time: '10:42 AM' },
      ],
    },
    {
      id: 2,
      name: 'Dev Team',
      avatar: 'DT',
      color: '#0ea5e9',
      lastMsg: 'Sprint review at 3 PM today.',
      time: '9:15 AM',
      unread: 5,
      messages: [
        { id: 1, from: 'them', text: 'Good morning team!', time: '9:00 AM' },
        { id: 2, from: 'me', text: 'Morning! Ready for the sprint.', time: '9:10 AM' },
        { id: 3, from: 'them', text: 'Sprint review at 3 PM today.', time: '9:15 AM' },
      ],
    },
    {
      id: 3,
      name: 'Bob Smith',
      avatar: 'BS',
      color: '#10b981',
      lastMsg: 'Thanks for the help yesterday!',
      time: 'Yesterday',
      unread: 0,
      messages: [
        { id: 1, from: 'me', text: 'Sure, happy to help anytime!', time: 'Yesterday' },
        { id: 2, from: 'them', text: 'Thanks for the help yesterday!', time: 'Yesterday' },
      ],
    },
    {
      id: 4,
      name: 'Project Alpha',
      avatar: 'PA',
      color: '#f59e0b',
      lastMsg: 'Design mockups are ready.',
      time: 'Mon',
      unread: 0,
      messages: [
        { id: 1, from: 'them', text: 'Design mockups are ready for review.', time: 'Mon' },
      ],
    },
    {
      id: 5,
      name: 'Sarah Williams',
      avatar: 'SW',
      color: '#ec4899',
      lastMsg: 'See you at the standup!',
      time: 'Sun',
      unread: 1,
      messages: [
        { id: 1, from: 'them', text: 'Are you joining the call?', time: 'Sun' },
        { id: 2, from: 'me', text: 'Yes, on my way!', time: 'Sun' },
        { id: 3, from: 'them', text: 'See you at the standup!', time: 'Sun' },
      ],
    },
  ];
}
