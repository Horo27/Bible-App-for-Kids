// API utility functions for fetching data from the backend

/**
 * Fetch featured stories from the API
 * @returns Promise<Array> Array of featured story objects
 */
export const fetchFeaturedStories = async () => {
  try {
    // Implementation would connect to your backend
    // const response = await fetch('https://your-api.com/featured-stories');
    // const data = await response.json();
    // return data;
    
    // For now, return mock data
    return [
      { 
        id: '1', 
        title: 'Noah\'s Ark', 
        image: 'https://images.pexels.com/photos/4397899/pexels-photo-4397899.jpeg', 
        description: 'The story of Noah and the great flood' 
      },
      { 
        id: '2', 
        title: 'David and Goliath', 
        image: 'https://images.pexels.com/photos/4344878/pexels-photo-4344878.jpeg', 
        description: 'A young boy defeats a giant warrior' 
      }
    ];
  } catch (error) {
    console.error('Error fetching featured stories:', error);
    return [];
  }
};

/**
 * Fetch recently viewed stories for the current user
 * @returns Promise<Array> Array of recently viewed story objects
 */
export const fetchRecentlyViewed = async () => {
  try {
    // Implementation would connect to your backend
    // const response = await fetch('https://your-api.com/recently-viewed');
    // const data = await response.json();
    // return data;
    
    // For now, return mock data
    return [
      { id: '3', title: 'Creation', image: 'https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg' },
      { id: '4', title: 'Jonah and the Whale', image: 'https://images.pexels.com/photos/4666754/pexels-photo-4666754.jpeg' }
    ];
  } catch (error) {
    console.error('Error fetching recently viewed:', error);
    return [];
  }
};

/**
 * Fetch all Bible chapters
 * @returns Promise<Array> Array of chapter objects
 */
export const fetchChapters = async () => {
  try {
    // Implementation would connect to your backend
    // const response = await fetch('https://your-api.com/chapters');
    // const data = await response.json();
    // return data;
    
    // For now, return mock data
    return [
      { 
        id: '1', 
        title: 'David', 
        description: 'A man after God\'s own heart', 
        image: 'https://i.postimg.cc/qvtJyVyz/david.png',
        storyCount: 2
      },
      { 
        id: '2', 
        title: 'Moses', 
        description: 'Freedom from slavery in Egypt', 
        image: 'https://i.postimg.cc/hv83w0wk/moses2.png',
        storyCount: 1
      },
      {
        id: '3',
        title: 'Noah',
        description: 'Faith and courage through the flood',
        image: 'https://i.postimg.cc/BnP2nvZ6/Noe2.png',
        storyCount: 3
      }
    ];
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return [];
  }
};

/**
 * Fetch story details by ID
 * @param id Story ID
 * @returns Promise<Object> Story object with details
 */
export const fetchStoryById = async (id: string) => {
  try {
    // Implementation would connect to your backend
    // const response = await fetch(`https://your-api.com/stories/${id}`);
    // const data = await response.json();
    // return data;
    
    // For now, return mock data
    const storyData = {
      '1': {
        id: '1',
        title: 'David & Goliath',
        video: require('..//assets//images//david&goliath.mp4'),
        quiz: [
          {
            question: "Who was the giant warrior from the Philistines?",
            options: [
              { id: "A", text: "Saul" },
              { id: "B", text: "David" },
              { id: "C", text: "Goliath" },
              { id: "D", text: "Samuel" }
            ],
            correctAnswerId: "C"
          },
          {
            question: "What did David use to fight Goliath?",
            options: [
              { id: "A", text: "A sword and shield" },
              { id: "B", text: "A bow and arrow" },
              { id: "C", text: "A slingshot and stones" },
              { id: "D", text: "A stick and rope" }
            ],
            correctAnswerId: "C"
          },
          {
            question: "Why was David brave enough to fight Goliath?",
            options: [
              { id: "A", text: "He was a trained soldier" },
              { id: "B", text: "He wanted to be famous" },
              { id: "C", text: "He believed God would help him" },
              { id: "D", text: "He had magical powers" }
            ],
            correctAnswerId: "C"
          }
        ]
      },
      '5': {
        id: '5',
        title: 'David plays for Saul',
        video: require('..//assets//images//david_plays_saul.mp4'),
        quiz: [
          {
            question: "Why was King Saul feeling sad?",
            options: [
              { id: "A", text: "He lost a battle" },
              { id: "B", text: "He was hungry" },
              { id: "C", text: "He didn’t know how to feel better" },
              { id: "D", text: "He missed David" }
            ],
            correctAnswerId: "C"
          },
          {
            question: "What instrument did David play for King Saul?",
            options: [
              { id: "A", text: "Trumpet" },
              { id: "B", text: "Harp" },
              { id: "C", text: "Drums" },
              { id: "D", text: "Flute" }
            ],
            correctAnswerId: "B"
          },
          {
            question: "What happened when David played music for King Saul?",
            options: [
              { id: "A", text: "Saul got sleepy" },
              { id: "B", text: "Saul danced" },
              { id: "C", text: "Saul felt calm and happy" },
              { id: "D", text: "Saul left the palace" }
            ],
            correctAnswerId: "C"
          }
        ]
      },
      '9':{
        id: '9',
        title: 'Moses and the burning bush',
        video: require('..//assets//images//david.mp4'), // Note: This video is 'david.mp4', might be a placeholder
        quiz: [
          {
            question: "What strange thing did Moses see in the desert?",
            options: [
              { id: "A", text: "A flying camel" },
              { id: "B", text: "A bush that was on fire but not burning up" },
              { id: "C", text: "A rainbow in the sand" },
              { id: "D", text: "A talking sheep" }
            ],
            correctAnswerId: "B"
          },
          {
            question: "Who spoke to Moses from the burning bush?",
            options: [
              { id: "A", text: "An angel" },
              { id: "B", text: "His brother" },
              { id: "C", text: "God" },
              { id: "D", text: "A shepherd" }
            ],
            correctAnswerId: "C"
          },
          {
            question: "Why did God tell Moses to take off his shoes?",
            options: [
              { id: "A", text: "Because they were dirty" },
              { id: "B", text: "Because he was going to sleep" },
              { id: "C", text: "Because he was standing on holy ground" },
              { id: "D", text: "Because it was too hot" }
            ],
            correctAnswerId: "C"
          }
        ]
      },
      '13': {
        id: '13',
        title: "Noah's Ark",
        video: require('..//assets//images//noe.mp4'),
        quiz: [
          {
            question: "Why did God tell Noah to build an ark?",
            options: [
              { id: "A", text: "To sail to a new land" },
              { id: "B", text: "To hide from people" },
              { id: "C", text: "To escape a big storm" },
              { id: "D", text: "To save his family and animals from a great flood" }
            ],
            correctAnswerId: "D"
          },
          {
            question: "How many of each kind of animal did Noah take on the ark?",
            options: [
              { id: "A", text: "One" },
              { id: "B", text: "Two" },
              { id: "C", text: "Five" },
              { id: "D", text: "Ten" }
            ],
            correctAnswerId: "B"
          },
          {
            question: "What sign did God give to promise never to flood the earth again?",
            options: [
              { id: "A", text: "A dove" },
              { id: "B", text: "A star" },
              { id: "C", text: "A rainbow" },
              { id: "D", text: "A mountain" }
            ],
            correctAnswerId: "C"
          }
        ]
      },
      // Add more stories and their quizzes as needed
    };
    
    return storyData[id] || null;
  } catch (error) {
    console.error(`Error fetching story ${id}:`, error);
    return null;
  }
};

/**
 * Mark a story as viewed/recently read
 * @param storyId ID of the viewed story
 * @returns Promise<boolean> Success status
 */
export const markStoryAsViewed = async (storyId: string) => {
  try {
    // Implementation would connect to your backend
    // const response = await fetch('https://your-api.com/mark-viewed', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ storyId })
    // });
    // return response.ok;
    
    // For now, simulate success
    console.log(`Story ${storyId} marked as viewed`);
    return true;
  } catch (error) {
    console.error('Error marking story as viewed:', error);
    return false;
  }
};