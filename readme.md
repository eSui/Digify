# Digify

Digify aims to take our listening history, from Spotify, and display that history into an easy to read graph using the D3 library. I also used Scroll Magic to create a more modern design for the site itself. The project is built completely on the front-end side. Currently, the data can only search and compare the top 20 artists in each genre. For the future, I will be working on getting Spotify Users authenticated and getting the data necessary to display.

## Getting Started

Simply scroll down and type in a genre of your choice. During the time of this project (March 2017), there was a discrepancy within the Pop Genre. Ed Sheeran had taken the lead in popularity but his follower count did not reflect this at all.

Unfortunately, due to Spotify's updated terms of service, the app currently cannot function at this time since it now requires user authentication for all calls to their API.  

You can check out the app in action [here](https://www.youtube.com/watch?v=kVqfOBM18g8).

## Built With

* [Spotify Web API](http://www.dropwizard.io/1.0.2/docs/) - Spotify provided the data used for this app.
* [Data Driven Documents](https://maven.apache.org/) - Javascript Library was used to display the data from Spotify API into easy to digest charts.
* [ScrollMagic](https://rometools.github.io/rome/) - A little bit of animations were added to improve navigation throughout the app.

## Inspirations

This project was inspired by one showcased by Spotify. You can check out their project [here](https://developer.spotify.com/showcase/item/klangspektrum/).

## Disclaimer
As of May 2017, Spotify now requires API keys for all calls to their Web API.
