import Pusher from "pusher-js";

let cachedPusher: Pusher | null = null;

function getPusherClientInstance() {
  if (cachedPusher) {
    return cachedPusher;
  }

  const newPusherClient = new Pusher("2b487a300a49fd62545f", {
    cluster: "sa1",
  });

  cachedPusher = newPusherClient;

  return newPusherClient;
}

export const pusherClient = getPusherClientInstance();
