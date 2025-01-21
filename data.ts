const data = {
  video: {
    move: "https://utfs.io/f/YPzBeu2LFmG80DHej8wa6xIJzMvKQT5otf7Fe2kSRp934BHN",
    insert: "https://utfs.io/f/YPzBeu2LFmG88EyER9Gx7YyIRgspPlL0VKqZm4De1oHXifUE",
    select: "https://utfs.io/f/YPzBeu2LFmG8GHlO0y6ir1A9gPnBlZO5TdyzIVq7NoWYakeb",
    delete: "https://utfs.io/f/YPzBeu2LFmG8UNwLCsnhVdUhBFArE38owSHbQxOCymvZR4c2",
    swap: "https://utfs.io/f/YPzBeu2LFmG807PCMzwa6xIJzMvKQT5otf7Fe2kSRp934BHN",
    reorder: "https://utfs.io/f/YPzBeu2LFmG88Tc5s9Gx7YyIRgspPlL0VKqZm4De1oHXifUE",
    nextCommandArg: "https://utfs.io/f/YPzBeu2LFmG8Lg4QWq2X1sAig29KTWF6ZjSxqBPRMJOeVQhD",
    reveal: "https://utfs.io/f/YPzBeu2LFmG87ibG7AcQSNZgw4tqs8ITdxU1YPzK6hGelmFo",
  },
  image: {
    wrapperCmdPreview: "https://utfs.io/f/YPzBeu2LFmG8U1sIyghVdUhBFArE38owSHbQxOCymvZR4c2z",
    invalidConfig: "https://utfs.io/f/YPzBeu2LFmG8ijmbWv0zq4XIS9DrvTYHQ6gFxCwGL0u2mKn5",
  },
};

export type AvailableVideo = keyof typeof data.video;
export type AvailableImage = keyof typeof data.image;

export default data;