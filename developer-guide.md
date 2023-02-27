# LearnTuber Developer Guide

## Step 1

Clone the repostory in your system.

## Step 2

Locate the local repo and run two terminals in client and server directory of the repo.

## Step 3

Run "npm install" on both server and client terminal.

## Step 4

Run "npm run serve" on server side terminal.

## Step 5

Run "npm run dev" on client side terminal.

## Step 6

Go to the link provided on the client side terminal to access client side page.

## Step 7

Add YouTube URL (recommended to choose a short video to decrease processing time) in the input box and press summarize button and wait for few minutes.

## Step 8

The requested output would be available on the webpage as well as server terminal would have requested URL, converted audio URL, transcribed text, summarized text and quiz in proper format.


## Possible errors

We are using free plan for API services so bellow are some possible errors as well as their fix:

In case of errors like "unauthorized API key" in server side terminal. Replace value of OPENAI_API_KEY variable in server/index.js line:20 with your openAI API key.
Visit [this link](https://platform.openai.com/account/api-keys) to create your own OpenAI API key.

If you get any errors in Api_key variable (assemblyAI API error) then visit [this link](https://www.assemblyai.com/app/account) and get your own API key from AssemblyAI and replace value of Api_key in server/index.js line:12 with your API key. 

