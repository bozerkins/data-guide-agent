module.exports = class Pipeline{

    constructor(name) 
    {
        this.name = name;
        this.receivers = [];
    }

    receiveFrom(receiver) 
    {
        this.receivers.push(receiver);
    }

    start()
    {
        this.receivers.forEach(receiver => {
            receiver.listen();
        });
    }
};