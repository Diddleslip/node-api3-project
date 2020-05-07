const server = require("./server");

const Port = process.env.PORT || 8000;

server.listen(Port, () => {
    console.log(`Server is up and running! In Port: ${Port}`);
})