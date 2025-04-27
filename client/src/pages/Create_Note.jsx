import React from "react";

export default function CreateNote() {
  return (
    <div className="container flex flex-col justify-center items-center mx-auto mt-10 space-y-10">
      <h2 className="text-3xl font-bold">New Note</h2>
      <form action="" className="flex flex-col w-1/2 space-y-5">
        <input
          type="text"
          className="px-3 py-1 bg-white border-2 border-solid rounded"
          placeholder="Title"
          name="title"
        />
        <textarea
          className="px-3 py-1 bg-white border-2 border-solid rounded resize-y h-100"
          name=""
          id=""
          placeholder="Enter your notes here..."
        ></textarea>
        <button className="py-2 bg-black text-white font-bold rounded text-xl">
          Add
        </button>
      </form>
    </div>
  );
}
