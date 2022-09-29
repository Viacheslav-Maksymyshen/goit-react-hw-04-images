import React, { useState, useEffect } from "react";

import st from "./App.module.css";
import Searchbar from "./components/Searchbar";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import fetchDataApi from "./services/fetchDataApi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [gallery, setGallery] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showloadMore, setShowloadMore] = useState(false);
  const [error, setError] = useState(null);
  const [largeImage, setLargeImage] = useState({});

  useEffect(() => {
    if (searchQuery !== "") {
      const fetchGallary = async () => {
        setShowLoader(true);
        try {
          const data = await fetchDataApi(searchQuery, page);
          const totalPages = Math.ceil(data.totalHits / 12);

          if (data.hits.length === 0) {
            return toast.error(
              "Sorry, we do not have any images for your request"
            );
          }
          if (page === 1) {
            toast.success(`We found ${data.totalHits} images.`);
          }
          if (page === totalPages && page > 1) {
            setShowloadMore(false);
            toast.info("You've reached the end of search results.");
          }
          if (page < totalPages) {
            setShowloadMore(true);
          } else {
            setShowloadMore(false);
          }
          setGallery((prevGallery) => [...prevGallery, ...data.hits]);
          scrollToDown();
        } catch (error) {
          setError(error);
        } finally {
          setShowLoader(false);
        }
      };
      fetchGallary();
    }
  }, [page, searchQuery]);

  const scrollToDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleFormSubmit = (query) => {
    if (query === searchQuery) {
      return;
    }
    setPage(1);
    setSearchQuery(query);
    setGallery([]);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleOpenPicture = (largeImage) => {
    setLargeImage(largeImage);
    toggleModal();
  };

  const onLoadMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <div className={st.App}>
      <Searchbar onSubmit={handleFormSubmit} />

      {error && <p>{error.message}</p>}

      {gallery.length > 0 && (
        <ImageGallery gallery={gallery} onOpenPicture={handleOpenPicture} />
      )}

      {showLoader && <Loader />}
      {showloadMore && <Button onLoadMore={onLoadMore} />}
      {showModal && (
        <Modal
          largeImage={largeImage.largeImageURL}
          tags={largeImage.tags}
          onClose={toggleModal}
        />
      )}
      <ToastContainer />
    </div>
  );
}
