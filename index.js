const http = require("http");
const app = require("./app");

const normalizePort = (val) => {

    var port = parseInt(val,10);
    if(isNaN(val)){
        return val;
    }
    if(port >= 0){
        return port;
    }
    return false;
}  


const onError = error => {
    if (error.syscall !== "listen") {
      throw error;
    }
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

  const onlistening = () => {
    const addr = server.address();
}
const port =  normalizePort(process.env.PORT || "3000" );
app.set("port", port);

console.log(`Server is running on ${port}`);
const server = http.createServer(app);
server.on("error",onError);
server.on("Listening",onlistening);
server.listen(port);