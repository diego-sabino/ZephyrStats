import React from 'react';

function NotFound() {
  return (
    <section
      className="flex items-center h-screen
     p-16 bg-gray-900 text-gray-100"
    >
      <div
        className="container flex flex-col
      items-center justify-center px-5 mx-auto my-8"
      >
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-gray-600">
            <span className="sr-only">Error</span>
            404
          </h2>
          <a
            rel="noopener noreferrer"
            href="/"
            className="px-8 py-3 font-semibold
            rounded bg-violet-400 text-gray-900"
          >
            Back to homepage

          </a>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
