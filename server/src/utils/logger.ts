import { FastifyReply, FastifyRequest } from "fastify";

const logger = async (req: FastifyRequest, rep: FastifyReply) => {
  // Logging logic here
  console.log(`${req.method} ${req.url} - ${rep.statusCode}`);
};

export default logger;
