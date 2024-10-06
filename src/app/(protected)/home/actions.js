const imageUrls = [
  "https://images.unsplash.com/photo-1727969470495-de73c606af53?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8cVBZc0R6dkpPWWN8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1726221439752-f09e3e51b2f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8cVBZc0R6dkpPWWN8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1727807232404-78c35fd9dd31?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1727873791735-033da8c912ce?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1727717561078-a58d2a7cb1fb?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

];



// Sample mock trending podcasts array
const mockTrendingPodcasts = [
  { name: "Podcast 1", views: 1000 },
  { name: "Podcast 2", views: 1500 },
  { name: "Podcast 3", views: 2000 },
  { name: "Podcast 4", views: 2500 },
  { name: "Podcast 5", views: 3000 },
];

// assign by index of imageUrls
mockTrendingPodcasts.forEach((podcast, index) => {
  podcast.thumbnail = imageUrls[index];
});

export const getTrending = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTrendingPodcasts);
    }, 1000);
  });
};

