import { onResponseHookHandler, FastifyRequest, FastifyReply } from "fastify";

const logger: onResponseHookHandler = async (
  req: FastifyRequest,
  rep: FastifyReply,
  done: () => void
) => {
  console.log(`${req.method} ${req.url}`);
  done();
};

export default logger;
