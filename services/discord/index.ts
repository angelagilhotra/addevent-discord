import * as Config from '../../config/index.json';
import { generateDiscordAPI } from '../../utils';

const embedImageUrl = "https://gateway.pinata.cloud/ipfs/QmQd5vCAM6xXXy61WLYkFV5oD4TkUVEgn9NQCZwo5Pbymv"

export const sendUpdate = async ({
  channel,
  title,
  description,
  content
}) => {
  const discordAPI = generateDiscordAPI(Config.discord.token);
  const message = generateMessage ({title, description, content});
  await discordAPI.post(`/channels/${channel}/messages`, {
    ...message
  });
  return;
}

const generateMessage = ({title, description, content}) => {
  return {
    content,
    embeds: [{
      color: "7829367",
      description,
      title,
      image: {
        url: embedImageUrl
      }
    }]
  }
}