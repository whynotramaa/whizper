import mongoose from "mongoose";

type ConnectionObj = {
    isConnected?: number
}

const connection: ConnectionObj = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to database")
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {})  //study abouy oprions that go in {}
        connection.isConnected = db.connections[0].readyState

        console.log(db)

        console.log("DB CONNECTED SUCCESSFULLY !!!!")
    } catch (error) {
        console.log("DB CONNECTION FAILED ", error)
        process.exit(1)
    }

}


export default dbConnect

// void is not as same as c++

// the main summary : we need to check is DB connected or not because if it is connecetd and then also we are establishing a connection we might choke the DB with lots of load 
// and after that is done we are connecting mongoose with DB, if error exist the process 

// why we need to check connection?
//  in node js or any prooper backend we have undisturbed connection to DB once it is connected but in nextJS it works on edge based that is with each request we try to connect to DB after some intervals and it is not always connected to database 
// so we for once check if it is still connected or not 

