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
        description: 'The beginning of everything', 
        image: 'https://i.postimg.cc/qvtJyVyz/david.png',
        storyCount: 5
      },
      { 
        id: '2', 
        title: 'Moses', 
        description: 'Freedom from slavery in Egypt', 
        image: 'https://i.postimg.cc/3JfrkJys/moses.png',
        storyCount: 4
      },
      {
        id: '3',
        title: 'Daniel',
        description: 'Faith and courage in Babylon',
        image: 'https://images.pexels.com/photos/247676/pexels-photo-247676.jpeg',
        storyCount: 3
      },
      {
        id: '4',
        title: 'Jonah',
        description: 'Adventures with a big fish',
        image: 'https://images.pexels.com/photos/3155726/pexels-photo-3155726.jpeg',
        storyCount: 1
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
        title: 'Noah\'s Ark',
        audioUrl: 'https://example.com/audio/noahs-ark.mp3',
        duration: 180, // 3 minutes
        slides: [
          {
            image: 'https://images.pexels.com/photos/4397899/pexels-photo-4397899.jpeg',
            text: 'God told Noah to build a giant boat called an ark.'
          },
          {
            image: 'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg',
            text: 'Noah brought two of every animal onto the ark.'
          },
          {
            image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg',
            text: 'It rained for 40 days and 40 nights, flooding the whole earth.'
          },
          {
            image: 'https://images.pexels.com/photos/1477199/pexels-photo-1477199.jpeg',
            text: 'Noah sent out a dove, which returned with an olive leaf.'
          },
          {
            image: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg',
            text: 'God put a rainbow in the sky as a promise to never flood the earth again.'
          }
        ]
      },
      // Add more stories as needed
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