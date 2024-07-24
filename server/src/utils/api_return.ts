import { FastifyReply } from "fastify";

export function valid_reply(rep: FastifyReply, data: object | null | undefined, msg = "Successful Response", status = 200) {
  return rep.send({
    message: msg,
    success: true,
    error: false,
    statusCode: status,
    data,
  });
}

export function invalid_reply(rep: FastifyReply, data: object | null | undefined, msg = "Something Went Wrong", status = 200) {
  return rep.send({
    message: msg,
    success: false,
    error: true,
    statusCode: status,
    data,
  });
}

export function valid_return(data: any, msg = "Successful Response", status = 200) {
  return {
    message: msg,
    success: true,
    error: false,
    statusCode: status,
    data,
  };
}
export function invalid_return(data: any, msg = "Something Went Wrong", status = 400) {
  return {
    message: msg,
    success: false,
    error: true,
    statusCode: status,
    data,
  };
}
