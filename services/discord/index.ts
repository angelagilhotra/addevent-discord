import * as Config from '../../config/index.json';
import { generateDiscordAPI } from '../../utils';

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
      title
    }]
  }
}