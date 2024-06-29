### [1] What is MongoDB? Explain its key features.

MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. It features high availability, horizontal scalability, and dynamic schemas.

### [2] Differentiate between MongoDB and SQL databases.

MongoDB is schema-less, uses JSON-like documents for storage, and supports dynamic schemas. SQL databases have predefined schemas, use tables with rows and columns, and are relational.

### [3] What is BSON? How is it different from JSON?

BSON (Binary JSON) is a binary-encoded serialization of JSON-like documents used by MongoDB. It includes additional data types like Date and Binary. BSON allows for efficient encoding and decoding compared to plain JSON.

### [4] Explain the structure of a MongoDB document.

A MongoDB document is a JSON-like data structure composed of field-value pairs. It can contain nested documents and arrays. Each document is stored in a collection within MongoDB.

### [5] What is Sharding in MongoDB? When and why is it used?

Sharding is the process of distributing data across multiple machines to handle large datasets and provide horizontal scalability. It's used when data grows beyond the storage capacity of a single machine.

### [6] What is Replication in MongoDB? How does it work?

Replication involves synchronizing data across multiple servers to ensure redundancy and high availability. MongoDB uses replica sets, where one primary node receives all write operations while secondary nodes replicate data from the primary.

### [7] Describe the aggregation framework in MongoDB.

The aggregation framework is used for data processing and transformation tasks. It allows MongoDB to perform complex operations like filtering, grouping, sorting, and joining documents.

### [8] What is indexing in MongoDB? Why is it important?

Indexing in MongoDB improves query performance by storing a small portion of the collection’s data in an easy-to-traverse form. It speeds up data retrieval but requires additional storage space and maintenance.

### [9] How does MongoDB ensure high availability?

MongoDB achieves high availability through replica sets. If the primary node fails, one of the secondary nodes automatically becomes the primary, ensuring uninterrupted service.

### [10] What are the different types of MongoDB indexes?

MongoDB supports single-field, compound, multi-key, text, geospatial, hashed, and TTL (time-to-live) indexes. Each type serves different querying needs.

### [11] How does MongoDB handle transactions?

MongoDB supports multi-document transactions starting from version 4.0. Transactions allow operations on multiple documents to be grouped together, ensuring atomicity, consistency, isolation, and durability (ACID properties).

### [12] Explain the concept of GridFS in MongoDB.

GridFS is a specification for storing and retrieving large files in MongoDB. It divides a file into smaller chunks, storing each chunk as a separate document, which allows efficient handling of large files.

### [13] What are the best practices for MongoDB schema design?

Best practices include embedding related data in documents, using indexes strategically, denormalizing data for read performance, and considering workload patterns for shard key selection.

### [14] How can you improve MongoDB performance?

Performance improvements can be achieved by optimizing queries (using indexes and appropriate query patterns), scaling horizontally via sharding, using appropriate hardware, and configuring MongoDB for your specific workload.

### [15] What are MongoDB capped collections? When are they useful?

Capped collections are fixed-size collections that automatically remove older documents to make space for new ones. They are useful for applications like logging or caching where you only need the most recent data.

### [16] How does MongoDB handle concurrency?

MongoDB uses locking at the database level for write operations, allowing multiple read operations to be concurrent. Write operations lock the entire database, collection, or document being modified.

### [17] What is the role of Journaling in MongoDB?

Journaling ensures data durability by recording write operations before they are applied to data files. It helps recover data in case of unexpected shutdowns or crashes.

### [18] Explain the differences between find() and findOne() methods in MongoDB.

find() returns a cursor to all documents that match a query and can return multiple documents. findOne() returns the first document that matches the query and returns null if no document matches.

### [19] What is the role of the profiler in MongoDB?

The profiler in MongoDB helps to analyze the performance of read and write operations. It logs query execution times and can be used to identify slow queries for optimization.

### [20] How can you backup and restore MongoDB databases?

MongoDB provides mongodump and mongorestore utilities for backup and restore operations. mongodump creates a binary export of the database, while mongorestore imports data from a mongodump archive back into MongoDB.

# [21] How do you create an index in MongoDB?
Indexes can be created in MongoDB using the createIndex() method, specifying the collection and the field(s) to index. MongoDB supports various types of indexes, including single field, compound, multikey, and geospatial indexes.

# [22] What is the role of the mongod process in MongoDB?
The mongod process is the primary daemon process responsible for running the MongoDB server. It handles data storage, retrieval, and management operations.

# [23] What is the role of the mongos process in MongoDB?
The mongos process is the MongoDB shard router responsible for routing client requests to the appropriate shard in a sharded cluster. It acts as a gateway between clients and the MongoDB cluster.

# [24] What is the role of the mongotop command in MongoDB?
The mongotop command is used to monitor the read and write activity of MongoDB instances in real-time. It provides information about the most active collections and databases, helping identify performance bottlenecks and optimize resource usage.

# [25] What is a TTL index in MongoDB?
A TTL (Time-To-Live) index is a special type of index in MongoDB that automatically deletes documents from a collection after a specified period of time. It is commonly used for expiring data, such as session logs or temporary records.
These questions cover a range of MongoDB topics, from basic concepts to more advanced features and administration tasks. Depending on the job role and level of expertise required, interview questions may focus on specific areas of MongoDB.