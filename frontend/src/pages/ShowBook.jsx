import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({}); // Book state to hold the fetched data
  const [loading, setLoading] = useState(false); // Loading state to handle spinner display
  const { id } = useParams(); // Extracting the 'id' parameter from the route

  useEffect(() => {
    // Fetch the book data when the component mounts or when the 'id' changes
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        setBook(response.data.book || {}); // Use response.data.book if the backend sends { book: {...} }
      } catch (error) {
        console.error("Error fetching book data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]); // Add the id dependency to ensure useEffect runs when 'id' changes

  // Conditional rendering based on the loading state
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner /> // Show spinner while loading
      ) : (
        // Display book details when not loading
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">ID</span>
            <span>{book._id || "N/A"}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book.title || "N/A"}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book.author || "N/A"}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year</span>
            <span>{book.publishYear || "N/A"}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Created At</span>
            <span>
              {book.createdAt ? new Date(book.createdAt).toString() : "N/A"}
            </span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Updated At</span>
            <span>
              {book.updatedAt ? new Date(book.updatedAt).toString() : "N/A"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
