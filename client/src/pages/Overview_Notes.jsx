import React from "react";

export default function OverviewNotes() {
  const arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];

  return (
    <div className="container mx-auto pt-10 h-screen">
      <h1 className="font-bold text-3xl mb-10 border-b-2 w-1/8">
        ALL NOTES...
      </h1>
      <div className="flex flex-wrap gap-10">
        {arr.map((el, index) => {
          return (
            <div
              key={index}
              className="bg-white border-2 border-solid rounded-md px-5 py-3 hover:shadow-xl"
            >
              <h2 className="font-semibold text-xl">Title</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                doloremque modi earum. Optio, minus dolorum Lorem ipsum dolor
                sit amet consectetur, adipisicing elit. Voluptatum, ratione
                architecto! Itaque soluta et in doloremque quaerat animi,
                debitis adipisci!...
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
