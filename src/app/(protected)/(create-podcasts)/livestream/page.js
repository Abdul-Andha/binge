"use client";
import Call from "./components/Call"
import { useState } from "react"

export default function LivestreamPodcast({ params }){
    // this view will be the view the user sees when a episode is live, it will differentiate between a host and viewer
    // the [episodeID] in the folder name will be the id of the episode (we will get using useSearchParams) which we will use to fetch data from it from DB 
    const [episodeName, setEpisodeName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedPodcast, setSelectedPodcast] = useState("sports");

    return (
        <main className="flex w-full flex-col p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Create Live Podcast</h1>
            <form className="space-y-4">
                <div>
                    <label className="block text-gray-500 font-bold mb-1" htmlFor="episodeName">
                        Episode Name
                    </label>
                    <input
                        type="text"
                        id="episodeName"
                        placeholder="Enter name of episode"
                        value={episodeName}
                        onChange={(e) => setEpisodeName(e.target.value)}
                        className="bg-gray-200 border rounded w-full py-2 px-4"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-500 font-bold mb-1" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        placeholder="Give a description of the episode and what it covers..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-gray-200 border rounded w-full py-2 px-4 h-32"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-500 font-bold mb-1" htmlFor="podcastCategory">
                        Podcasts
                    </label>
                    <select
                        id="podcastCategory"
                        value={selectedPodcast}
                        onChange={(e) => setSelectedPodcast(e.target.value)}
                        className="bg-gray-200 border rounded w-full py-2 px-4"
                    >
                        <option value="sports">Sports</option>
                        <option value="news">News</option>
                        <option value="classes">Classes</option>
                        <option value="clubs">Clubs</option>
                    </select>
                </div>
            </form>

            <div className="text-center">
                <br></br>
                <br></br>
                <Call 
                    appId={process.env.NEXT_PUBLIC_AGORA_APP_ID} 
                    channelName={"hello"} 
                    episodeName={episodeName} 
                    description={description} 
                    selectedPodcast={selectedPodcast} 
                />
            </div>

            <p className="absolute z-10 mt-2 ml-12 text-2xl font-bold text-gray-900">
                {params.channelName}
            </p>
        </main>
    )
}