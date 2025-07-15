import React, { useState } from "react";

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 700px)").matches;
}

function extractYouTubeId(url) {
  if (!url) return null;
  const regex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default function VideoCard({ video }) {
  const [showModal, setShowModal] = useState(false);

  const id = extractYouTubeId(video.url);
  const embedURL = id ? `https://www.youtube.com/embed/${id}` : null;
  const originalURL = id ? `https://www.youtube.com/watch?v=${id}` : video.url;

  const openModal = () => {
    if (isMobile()) {
      window.open(originalURL, "_blank", "noopener,noreferrer");
      return;
    }
    setShowModal(true);
  };

  const closeModal = (e) => {
    if (
      e.target.classList.contains("modal-overlay") ||
      e.target.classList.contains("close-modal")
    ) {
      setShowModal(false);
    }
  };

  return (
    <>
      <style>{`
        .video-card {
          cursor: pointer;
          transition: box-shadow 0.2s;
        }
        .video-card:hover {
          box-shadow: 0 4px 24px rgba(0,0,0,0.12);
        }
        .video-thumb {
          width: 100%;
          aspect-ratio: 16/9;
          object-fit: cover;
          border-radius: 8px;
          background: #eee;
          margin-bottom: 0.75rem;
        }
        .modal-overlay {
          position: fixed;
          z-index: 1000;
          inset: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-content {
          background: #fff;
          border-radius: 10px;
          padding: 0;
          max-width: 90vw;
          max-height: 80vh;
          box-shadow: 0 8px 32px rgba(0,0,0,0.25);
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .close-modal {
          position: absolute;
          top: 0.5rem;
          right: 0.75rem;
          background: none;
          border: none;
          font-size: 2rem;
          color: #333;
          cursor: pointer;
          z-index: 2;
        }
        .modal-iframe {
          width: 60vw;
          max-width: 800px;
          height: 34vw;
          max-height: 450px;
          border: none;
          border-radius: 10px;
          background: #000;
        }
        @media (max-width: 700px) {
          .modal-iframe {
            width: 90vw;
            height: 50vw;
            max-height: 60vw;
          }
        }
      `}</style>
      <div
        className="video-card"
        onClick={openModal}
        tabIndex={0}
        aria-label={`Play video: ${video.title}`}
      >
        <img
          className="video-thumb"
          src={id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : ""}
          alt={`Thumbnail for ${video.title}`}
          loading="lazy"
        />
        <p className="video-title">{video.title}</p>
        {video.subtitle && (
          <p
            className="video-date"
            style={{
              fontSize: "0.95em",
              color: "#888",
              marginTop: "0.25rem",
            }}
          >
            {video.subtitle}
          </p>
        )}
      </div>
      {showModal && embedURL && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <button
              className="close-modal"
              onClick={closeModal}
              aria-label="Close video modal"
            >
              &times;
            </button>
            <iframe
              className="modal-iframe"
              src={embedURL + "?autoplay=1"}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
