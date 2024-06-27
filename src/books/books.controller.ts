// import { Request, Response } from "express";
// import { Book } from "./book.schema";

// export class BooksController {
//     constructor(){
//         this.createBooks = this.createBooks.bind(this);
//     }
//   async createBooks(req: Request, res: Response) {
//     const { title, author } = req.body;
//     try {
//       // Create a new book in the database
//       const newBook = await Book.create({ title: title, author: author } as  any);
//       // Respond with the newly created book object
//       res.status(201).json(newBook);
//     } catch (error) {
//       console.error("Error creating book:", error);
//       // If there's an error, respond with an error message
//       res.status(500).json({ message: "Internal server error" });
//     }
//   }
// }

