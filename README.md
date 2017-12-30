flag-at-half-mast
=================

Determine whether the United States flag is to be flown at half mast today. Uses the White House's public RSS stream to look through presidential proclamations. 

Note: This code isn't foolproof. This runs purely on some keywords I found in White House press releases relating to the flag being at half mast. If the White House decides to change these phrases for some reason, you'll need to update the code. There's no API (that I could find at least) that gives this information.

Some of the RSS fetching code borrowed from https://github.com/dwyl/node-parse-rss.

White House Presidential Proclamations archive: https://www.whitehouse.gov/briefing-room/presidential-actions/proclamations

White House Briefing Room RSS feed: https://www.whitehouse.gov/feed/press

Written in about an hour in July 2016. 

Demo here: http://flag.nomik.xyz (now offline)

UPDATE (December 2017): Looks like the White House got rid of their RSS feed for Presidential Proclamations. This app no longer works. 
