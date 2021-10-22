class Response {
    constructor(sucess, msg, data) {
        this.sucess = sucess;
        this.msg = msg;
        this.data = data;
        this.time_stamp = Date.now();
    }
}

module.exports = Response;