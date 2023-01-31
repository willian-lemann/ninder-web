import Pusher from "pusher";

let cachedPusher: Pusher | null = null;

function getPusherInstance() {
  if (cachedPusher) {
    console.log("cached");
    return cachedPusher;
  }

  const newPusherClient = new Pusher({
    appId: "1535242",
    key: "2b487a300a49fd62545f",
    secret: "d76e94b08bd975e1fe79",
    cluster: "sa1",
    useTLS: true,
  });

  cachedPusher = newPusherClient;

  console.log("new instance");

  return newPusherClient;
}

export const pusher = getPusherInstance();
