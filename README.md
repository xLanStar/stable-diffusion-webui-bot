# Stable Diffusion webui Bot

A Discord bot for Stable Diffusion webui. It's a bot client only. It need a server host Stable Diffusion webui.

## Screenshots

![](https://i.imgur.com/qtBuk6b.png)
![](https://i.imgur.com/GdRK9X3.png)
![](https://i.imgur.com/30zdTV1.png)
![](https://i.imgur.com/vvVzNK8.png)

## Features

- i18n
- preview for models, txt2img
- multiple clients requests

## Not Supported

- Lora, Embeding, Script Choosing UI
- Restore Faces, Tiling, Upscaling
- user data storaging
- selection for models

## Installation

Require Node >= 18

- `npm i`

## Environment Setting

All settings are in `.env` file.

- Copy `.env.example` to `.env`

## Setup Discord Bot Application

- Require "MESSAGE CONTENT INTENT" in BOT tab
- To Generate OAuth2 URL, you need to make sure at least several below are checked:
  - SCOPE:
    - bot
    - applications.commands
  - BOT PERMISSIONS:
    - Send Messages
    - Embed Links
    - Attach Files
    - Read Messages/View Channel
    - Add Reactions
    - Use Slash Command

## Setup Stable Diffusion Webui Connection

Make sure your Stable Diffusion settings satisfied below:

- Allow your requests.
- Added `--api` in arguments.

## Start

Execute `npm run start`
