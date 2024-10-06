const mockThumbnails = [
    "https://images.unsplash.com/photo-1727969470495-de73c606af53?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8cVBZc0R6dkpPWWN8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1726221439752-f09e3e51b2f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8cVBZc0R6dkpPWWN8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1727807232404-78c35fd9dd31?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1727873791735-033da8c912ce?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1727717561078-a58d2a7cb1fb?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
const mockViews = [23, 16, 11, 9, 4];

export const getTrending = async () => {
    try {
        const uploadRequest = await fetch("/api/files/allFiles", {
            method: "GET",
        });

        if (!uploadRequest.ok) {
            throw new Error("Failed to fetch trending podcasts");
        }

        const { files } = await uploadRequest.json();

        const trendingPodcasts = files.map((file, index) => {
            const title = file.name.replace(/\.[^/.]+$/, "");
            const formattedTitle = title
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

            return {
                name: formattedTitle,
                views: mockViews[index] || 0,
                thumbnail: file.signedUrl || 'default-thumbnail-url',
            };
        });

        const limitedTrendingPodcasts = trendingPodcasts.slice(0, 5).map((podcast, index) => ({
            ...podcast,
            thumbnail: mockThumbnails[index] || podcast.thumbnail,
        }));

        console.log("Trending podcasts:", limitedTrendingPodcasts);
        return limitedTrendingPodcasts;
    } catch (error) {
        console.error("Error fetching trending podcasts:", error);
        return [];
    }
};