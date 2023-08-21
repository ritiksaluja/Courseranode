import express from "express"
import { verifyToken } from "../Middleware/index.js"
import books from "../DB/Booksdata.js"

export const bookdata = express.Router()
bookdata.use(verifyToken)

 const booklist = books.map((obj)=>{
    return(
        obj.title
    )
 })

 const isbnnumber = (data)=>{  return books.find((obj) => obj.isbn === data); }
 const  bytitle = (data)=>{  return books.find((obj) => obj.title === data); }
 const  byauthor = (data)=>{  return books.find((obj) => obj.author === data); }
 const getReviewByAuthor = (author) => {
    const book = books.find((obj) => obj.author === author);
    if (book) {
      return book.reviews;
    } else {
      return null; 
    }
  }


  const deleteReview = (title, userName) => {
    const book = books.find((book) => book.title === title);
    if (book) {
      const updatedReviews = book.reviews.filter((review) => review.userName !== userName);
      book.reviews = updatedReviews;
      return true;
    } else {
      return false;
    }
  }

  

bookdata.get("/booklist" , (req , res)=>{
    res.status(200).json(booklist);
} )

bookdata.post("/byisbn" ,(req , res)=>{
    const {isbn} = req.body
    const book = isbnnumber(isbn);
    if (book) {
      res.status(200).json(book); d
    } else {
      res.status(404).json({ message: "Book not found" });
    }
})

bookdata.post("/title" ,(req , res)=>{
    const {title} = req.body
    const book = bytitle(title);
    if (book) {
      res.status(200).json(book); 
    } else {
      res.status(404).json({ message: "Book not found" });
    }
})

bookdata.post("/author" ,(req , res)=>{
    const {author} = req.body
    const book = byauthor(author);
    if (book) {
      res.status(200).json(book); 
    } else {
      res.status(404).json({ message: "Book not found" });
    }
})

bookdata.post("/review" ,(req , res)=>{
    const {author} = req.body
    const book =  getReviewByAuthor(author);
    if (book) {
      res.status(200).json(book); 
    } else {
      res.status(404).json({ message: "Book not found" });
    }
})

bookdata.post("/addreview", (req, res) => {
  const { user, review, title } = req.body;

  const book = books.find((obj) => obj.title === title);
  if (book) {
    book.reviews.push({
      userName: user,
      review: review
    });
    res.status(200).json({ message: "Review added / updated successfully" });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

bookdata.delete("/deletereview", (req, res) => {
  const { userName, title } = req.body;

  const reviewDeleted = deleteReview(title, userName);

  if (reviewDeleted) {
    res.status(200).json({ message: "Review deleted successfully" });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});