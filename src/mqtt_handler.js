// const Paho = require('paho-mqtt')

// const port = 9001
// const brokerURI = "localhost"
// const clientId = ""

// const client = new Paho.Client(brokerURI,port,clientId)

// client.onMessageArrived = onMessage;
// client.connect({onSuccess: onConnect, onFailure: onFail})




// // function sendMQ(){
// //     client.publish('common/client1','SUCC')
// // }

// function onConnect() {
//     console.log(`Connected to mqtt broker at: ws://${brokerURI}:${port}` )
//     console.log(`Client id is:${clientId}`)
//     // client.subscribe('client1',{qos:2})
// }

// function onFail(){
//     console.log(`Failed to connect to the mqtt broker at: ws://${brokerURI}:${port}` )
//     console.log(`With client id:${clientId}`)
// }

// function onMessage(message){
//     console.log(message)
// }

// module.exports = {
//     client
// }