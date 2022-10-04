const {MongoClient} = require('mongodb');

async function main(){
    const uri = "MONGO DB LINK";
    const client = new MongoClient(uri);
    await client.connect();

    
    await insertCustomer(client,{  //inserts customer into db
    Title: "Mr",
    FirstName: "Sample",
    Surname: "Beregoi",
    Mobile: 089123456,
    Email: "Ken@gmail.com",
    AddressLine1: "123 lane",
    AddressLine2: "Street",
    Town: "Maynooth",
    CC: "Kildare",
    Eir: "W23 LP23"
    });

    await insertItem(client,{  //inserts item into db
    Manufacturer: "One plus",
    Model: "9+",
    Price: 800
    });

    await insertOrder(client,{  //inserts order into db
    FirstName: "Sample",
    Surname: "Beregoi",
    Email: "John@gmail.com",
    Manufacturer: "Apple",
    Model: "iPhone Xs",
    Price: 500
    });
    

    console.log();
    await findOrder(client, "David"); //find order
    console.log();
    await updateOrder(client, "David", {Price: 800, Surname: "Balvan"}); //change price and surname
    console.log();
    await findOrder(client, "David"); //print same order shwoing change
    console.log();

    await findCustomer(client, "David"); //find a customer
    console.log();
    await updateCustomer(client, "David", {Mobile: 089123456, Email: "David@gmail.com", Title: "Mx"}); //change mobile, email and title
    console.log();
    await findCustomer(client, "David"); //print same customer showing change
    console.log();

    await findItem(client, "Apple", "iPhone Xs"); //find and show an item
    console.log();
    await updateItem(client, "Apple", "iPhone Xs", {Price: 1000}); //change price
    console.log();
    await findItem(client, "Apple", "iPhone Xs"); //show change
    console.log();

    await deleteCustomer(client, "David@gmail.com", 089123456, "David", "Beregoi"); //deletes customer based on email, number, first name and last name
    console.log();
    await deleteItem(client, "One plus", "9+"); //deletes item based on manufacturer and model
    console.log();
    await deleteOrder(client, "John@gmail.com", "Apple", "David", "Beregoi"); //deletes order based on email, names and manufacturer
}

main();

async function insertCustomer(client, details){
    const result = await client.db("assignment5").collection("customers").insertOne(details);
    console.log("Customer Inserted!");
}
async function insertOrder(client, details){
    const result = await client.db("assignment5").collection("orders").insertOne(details);
    console.log("Order Inserted!");
}
async function insertItem(client, details){
    const result = await client.db("assignment5").collection("items").insertOne(details);
    console.log("Item Inserted!");
}

async function findCustomer(client, name){
    const result = await client.db("assignment5").collection("customers").findOne({FirstName: name});

    console.log(`${result.Title}`);
    console.log(`${result.FirstName}`);
    console.log(`${result.Surname}`);
    console.log(`${result.Mobile}`);
    console.log(`${result.Email}`);
    console.log(`${result.AddressLine1}`);
    console.log(`${result.AddressLine2}`);
    console.log(`${result.Town}`);
    console.log(`${result.CC}`);
    console.log(`${result.Eir}`);

}
async function findOrder(client, name){
    const result = await client.db("assignment5").collection("orders").findOne({FirstName: name});

    console.log(`${result.FirstName}`);
    console.log(`${result.Surname}`);
    console.log(`${result.Email}`);
    console.log(`${result.Manufacturer}`);
    console.log(`${result.Model}`);
    console.log(`${result.Price}`);
}
async function findItem(client, man, m){
    const result = await client.db("assignment5").collection("items").findOne({Manufacturer: man, Model: m});

    console.log(`${result.Manufacturer}`);
    console.log(`${result.Model}`);
    console.log(`${result.Price}`);
}

async function updateCustomer(client, name, updatedDetails){
    const result = await client.db("assignment5").collection("customers").updateOne(
        { FirstName: name},
        { $set: updatedDetails}
    );
}
async function updateOrder(client, name, updatedDetails){
    const result = await client.db("assignment5").collection("orders").updateOne(
        { FirstName: name},
        { $set: updatedDetails}
    );
}
async function updateItem(client, n, m, updatedDetails){
    const result = await client.db("assignment5").collection("items").updateOne(
        { Manufacturer: n, Model: m},
        { $set: updatedDetails}
    );
}

async function deleteCustomer(client, e, p, fname, lname){
    await client.db("assignment5").collection("customers").deleteOne({FirstName: fname, Surname: lname, Email: e, Mobile: p});
    console.log("Deleted!");
}
async function deleteItem(client, e, p){
    await client.db("assignment5").collection("customers").deleteOne({Manufacturer: e, Model: p});
    console.log("Deleted!");
}
async function deleteOrder(client, e, man, fname, lname){
    await client.db("assignment5").collection("customers").deleteOne({FirstName: fname, Surname: lname, Email: e, Manufacturer: man});
    console.log("Deleted!");
}