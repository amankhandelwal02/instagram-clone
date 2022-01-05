import React, { useRef } from "react";
import { Snapshot, useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import styled from "styled-components";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { db, storage } from "../firebase";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from "firebase/storage";

const Modal = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const addImagePost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const captionRef = useRef(null);

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      userId: session.user.uid,
      caption: captionRef.current.value,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "posts", docRef.id), {
            image: downloadURL,
          })
      }
    );

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-sm p-6 my-8 overflow-hidden align-middle transition-all transform bg-gray-50 shadow-2xl rounded-2xl text-center">
              {selectedFile ? (
                <img
                  src={selectedFile}
                  alt=""
                  onClick={() => setSelectedFile(null)}
                  className="w-full object-contain cursor-pointer"
                />
              ) : (
                <div
                  onClick={() => filePickerRef.current.click()}
                  className="mx-auto flex items-center justify-center my-3 h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                >
                  <CameraAltIcon
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
              )}

              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 mt-3"
              >
                Uploads an image
              </Dialog.Title>
              <div>
                <input
                  type="file"
                  hidden
                  ref={filePickerRef}
                  onChange={addImagePost}
                />
              </div>
              <div className="mt-2">
                <Input
                  ref={captionRef}
                  className="p-1 bg-gray-50 w-full text-center"
                  type="text"
                  placeholder="please enter a caption..."
                />
              </div>
              <div className="mt-4">
                <button
                  onClick={uploadPost}
                  type="button"
                  disabled={!selectedFile}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed hover:disabled:bg-gray-300 disabled:bg-gray-300"
                >
                  {loading ? "Uploading..." : "Upload Post"}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;

const Input = styled.input`
  outline-width: 0;
  border: none;
`;
