import { onResponseHookHandler } from "fastify";
import { blackF, blueF, bold, greenF, megentaF, redF, whiteB, yellowF } from "./text-colorize";

// const logger:onResponseHookHandler =  async (req,rep, done){
//     console.log("\033[[]")
// }

const logger: onResponseHookHandler = async (req, rep, done) => {
  function format_status(status: number) {
    if (status >= 200 && status < 300) {
      return bold(greenF(String(status) + "  \x1b[0m"));
    } else if (status >= 300 && status < 400) {
      return bold(blueF(String(status) + " 󰱴 "));
    } else if (status >= 400 && status < 500) {
      return bold(yellowF(String(status) + "  "));
    } else if (status >= 500 && status < 600) {
      return bold(redF(String(status) + " 󰜺 "));
    } else {
      return String(status);
    }
  }

  const format =
    "[" +
    megentaF(new Date().toLocaleTimeString()) +
    "]:: " +
    whiteB(bold(" " + blackF(req.method) + " ")) +
    "\t " +
    decodeURIComponent(req.originalUrl) +
    "\t" +
    megentaF(rep.elapsedTime.toFixed(2) + " ms") +
    "  " +
    format_status(rep.statusCode);

  console.log(format);
  done();
};
export default logger;
