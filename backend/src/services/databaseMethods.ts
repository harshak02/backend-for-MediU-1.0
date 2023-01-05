

// const { MongoClient } = require('mongodb');
// let url =
// 	'mongodb+srv://tweetBot:tweetBot@cluster0.kuyrg.mongodb.net/?retryWrites=true&w=majority';
//let client: any;
class mongoMethods {
	
	/**
	 * @param  {any} client : client object
		* @returns boolean
		* @description checks if client is connected to database
	 */
	isconnect(client:any) {
		return client
			.connect()
			.then(() => {
				return true;
			})
			.catch((err: any) => {
				return err;
			});
	}
	/**
	 * @param  {any} client : client object
		* @returns void
		* @description lists all databases in the cluster
	 */
	async listDatabases(client:any) {
		const databaseList = await client.db().admin().listDatabases();
		console.log('Databases:');
		databaseList.databases.forEach((db: any) => {
			console.log(` - ${db.name}`);
		});
	}
	
	/**
	 * @param  {any} client:	client object
	 * @param  {string} dbName:	database name
	 * @param  {string} collectionName:	collection name
		* @returns void
		* @description creates a new collection in the database
	 */
	async	createCollection(client:any, dbName:string,collectionName:string) {
		const result = await client.db(dbName).createCollection(collectionName);
		console.log(result);
	}
	
	/**
	 * @param  {any} client:	client object
	 * @param  {string} dbName:	database name
	 * @param  {string} collectionName:	collection name
	 * @param  {Array<any>} documents:	array of documents to be inserted
		* @returns void
		* @description inserts array of documents into the collection
	 */
	async insertDocuments(client:any, dbName:string,collectionName:string,documents:Array<any>) {
		const result = await client.db(dbName).collection(collectionName).insertMany(documents);
		console.log(`${result.insertedCount} documents were inserted with the _id: ${result.insertedIds}`);
	}
	/**
	 * @param  {any} client:	client object
	 * @param  {string} dbName:	database name
	 * @param  {string} collectionName:	collection name
	 * @param  {any} query:	query to be used to find the document ,eg:-	{name:'Semwell'}
		* @returns res:	object containing status and result
		* @description finds a document in the collection
	 */
	async findDocuments(client:any, dbName:string,collectionName:string,query:any) {
		const result = await client.db(dbName).collection(collectionName).find(query).toArray();
		if(result.length>0){
		console.log("object found",result);
		let res={
			"status":true,
			"result":result
		}
		return res;
		}else{
			console.log("object not found");
			let res={
				"status":false,
				"result":undefined
			}
			return res;
		}
	}
	/**
	 * @param  {any} client : client object
	 * @param  {string} dbName : database name
	 * @param  {string} collectionName : collection name
	 * @param  {any} query : query to be used to find the document ,eg:-	{name:'Semwell'}
	 * @param  {any} update : update to be used to update the document ,eg:-	{$set:{name:'Semwell updated'}}
		* @returns void
		* @description updates a document in the collection
	 */
	async updateDocument(client:any, dbName:string,collectionName:string,query:any,update:any) {
		const result = await client.db(dbName).collection(collectionName).updateOne(query , update);
		console.log(`${result.matchedCount} document(s) matched the query criteria.`);
		console.log(`${result.modifiedCount} document(s) was/were updated.`);
		console.log(result);
	}
	
	/**
	 * @param  {any} client : client object
	 * @param  {string} dbName : database name
	 * @param  {string} collectionName : collection name
	 * @param  {any} query : query to be used to find the document ,eg:-	{name:'Semwell'}
		* @returns void
		* @description deletes a document in the collection
	 */
	async	deleteDocument(client:any, dbName:string,collectionName:string,query:any) {
		const result = await client.db(dbName).collection(collectionName).deleteOne(query);
		console.log(`${result.deletedCount} document(s) was/were deleted.`);
	}
}
//@Methods calls and constructor
module.exports = mongoMethods;
// async function start() {
// 	const mongoObject = new mongoMethods(url);
// 	mongoObject.isconnect().then((result: any) => {
// 		console.log(result);
// 	});
// 	await mongoObject.listDatabases();
// 	client.close().then(() => {
// 		console.log('Client closed');
// 	});
// }
// start();
