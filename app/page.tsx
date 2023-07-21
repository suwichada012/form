"use client";
import Modal from "react-modal";
import { useState } from "react";
export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open</button>
      <div>
        <Modal isOpen={open}>
          <div>I am a modal</div>
          <button onClick={() => setOpen(false)}>Close</button>
        </Modal>
      </div>
    </div>
  );
}
