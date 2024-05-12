# getStorage: This function is used to get a reference to the Firebase Storage service, which allows you to store and retrieve user-generated content like images, videos, and other files in the cloud.

# ref: This function is used to create a reference to a specific location in the storage. You can use this reference to upload, download, or manipulate files within that location.

# uploadBytesResumable: This function is used to upload a file to Firebase Storage in a resumable manner. It's useful for large files where the upload might be interrupted and needs to be resumed later.

# getDownloadURL: After uploading a file to Firebase Storage, you can use this function to get a downloadable URL for the uploaded file. This URL can then be used to access the file from a web browser or to embed it in your application.

# addDoc: This function is used to add a new document to a Firestore collection. Firestore is a flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud Platform.

# collection: This function is used to reference a specific collection in Firestore. Collections are containers for your documents. You can perform various operations on a collection, such as querying documents or adding new ones.

# getFirestore: This function is used to get a reference to the Firestore database service. It's necessary to interact with Firestore, similar to getStorage for Firebase Storage.

# serverTimestamp: This is a sentinel value that can be used when writing data to Firestore to have the server automatically generate a timestamp for the operation. It's useful for recording when data was last updated or created.

# onSnapshot is a method provided by Firestore that allows you to listen for real-time updates to a query. It's commonly used to set up listeners on Firestore queries to receive real-time updates whenever the result of the query changes.
