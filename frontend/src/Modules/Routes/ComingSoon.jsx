import React from 'react';

const ComingSoon = ({ name }) => {
  return (
    <div className="flex w-full h-screen justify-center items-center shadow-2xl shadow-gray-500">
      <section class="bg-gray-300 rounded-2xl dark:bg-gray-900 ">
        <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 ">
          <h1 class="mt-20 mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
           Coming Soon!
          </h1>
          <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            We are building something amazing for you. Stay tuned!
          </p>
          <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"></div>
        </div>
      </section>
    </div>
  );
};

export default ComingSoon;
