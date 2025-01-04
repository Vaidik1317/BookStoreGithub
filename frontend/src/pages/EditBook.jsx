import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch book data when component mounts
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        const book = response.data.book; // Assuming response structure is { book: {...} }
        setTitle(book.title);
        setAuthor(book.author);
        setPublishYear(book.publishYear);
      } catch (error) {
        console.error("Error fetching book data:", error);
        alert("An error occurred while fetching the book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // Handle form submission to edit book
  const handleEditBook = async () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    try {
      await axios.put(`http://localhost:5555/books/${id}`, data);
      alert("Book updated successfully!");
      navigate("/"); // Navigate to home or desired page after update
    } catch (error) {
      console.error("Error updating book:", error);
      alert("An error occurred while updating the book. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-white-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-white-500 px-4 py-2 w-full text-black"
            required
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-white-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-white-500 px-4 py-2 w-full text-black"
            required
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-white-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-white-500 px-4 py-2 w-full text-black"
            required
          />
        </div>

        <button
          className="p-2 bg-sky-300 text-white hover:bg-sky-400 rounded mt-4"
          onClick={handleEditBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
