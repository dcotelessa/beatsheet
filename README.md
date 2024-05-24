# Beat Sheet

This is a small app that allows users to input and modify a beat sheet.

## What's a Beat Sheet?

A beat sheet, originally a concept from screenwriting, is a kind of outline used to plan the content and structure o a piece of media.

For YouTube influencers, a beat sheet could be a way to plan out the content of a video or series of videos.

> Here's a simple example of what a beat sheet might look like for a YouTube video:

> - Intro (0:00-0:15): Brief introduction of the host (the influencer) and the topic of the video.
> - Title/Opening Credits (0:15-0:30): The opening title or credits for the video.
> - Hook (0:30-1:00): A hook to draw viewers in and get them interested in the rest of the video.
> - Overview (1:00-1:30): A more detailed overview of what will be covered in the video.
> - Main Content - Part 1 (1:30-5:00): The first part of the main content. This could be a tutorial, product review, story, etc.
> - Transition (5:00-5:15): A brief transition between the first and second parts of the main content.
> - Main Content - Part 2 (5:15-9:00): The second part of the main content.
> - Conclusion (9:00-10:00): Wrapping up the video, summarizing the key points, and perhaps providing a tease of what's coming in the next video.
> - Call to Action (10:00-10:30): Asking viewers to like, subscribe, comment, etc.
> - End Credits/Outro (10:30-11:00): End credits, bloopers, or other outro material.

## Features in the application:

- Lists all acts and all their subsequent beats
- List the beats in a specific act
- Create a new act
- Delete an act (and all the subsequent beats associated with)
- Create a beat in an act
- Update a beat in an existing act
- Remove a beat from the act
- (Optional) Loads and export flat file of beat
- (Optional) Resort beats within act

## To run application:
- (make sure to use npm of lts/hydrogen or higher - nvm use lts/hydrogen)
- npm i
- npm run dev, navigate to [localhost:3000](http://localhost:3000/)
- .env.local sets the the database, export of database is at [localhost:3000/api/data](http://localhost:3000/api/data)