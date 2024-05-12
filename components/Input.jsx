'use client'
import { app } from '@/firebase'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import { HiOutlinePhotograph } from 'react-icons/hi'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from 'firebase/firestore'
const Input = () => {
  const { data: session } = useSession()
  const imagePicRef = useRef(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [selectedFile, setSelectedFile] = useState()
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const [postLoading, setPostLoading] = useState(false)
  const db = getFirestore(app)

  const addImageToPost = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }
  }
  const upLoadImageToStorage = () => {
    setLoading(true)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + '-' + selectedFile.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, selectedFile)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // console.log('upload is' + progress + '%done')
      },
      (error) => {
        console.log(error)
        setSelectedFile(null)
        setImageFileUrl(null)
        setLoading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL)
          setLoading(false)
        })
      }
    )
  }
  useEffect(() => {
    if (selectedFile) {
      upLoadImageToStorage()
    }
  }, [selectedFile])
  const handleSubmit = async () => {
    setPostLoading(true)
    const docRef = await addDoc(collection(db, 'post'), {
      uid: session.user.uid,
      name: session.user.name,
      username: session.user.username,
      text,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
      image: imageFileUrl,
    })
    setPostLoading(false)
    setText('')
    setImageFileUrl(null)
    setSelectedFile(null)
    location.reload()
  }
  if (!session) return
  return (
    <div className='flex  p-3 space-x-3 w-full'>
      <img
        src={session.user.image}
        alt='user-img'
        className='w-11 h-11 rounded-full cursor-pointer hover:brightness-95'
      />
      <div className='w-full divide-y divide-gray-200'>
        <textarea
          placeholder='whats happening'
          className='w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700'
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        {selectedFile && (
          <img
            src={imageFileUrl}
            alt='image'
            className={`w-full max-h[250px] object-cover cursor-pointer ${
              loading ? 'animate-pulse' : ''
            }`}
          />
        )}
        <div className='w-full flex justify-between p-2'>
          <HiOutlinePhotograph
            onClick={() => imagePicRef.current.click()}
            className='h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer'
          />
          <input
            type='file'
            hidden
            ref={imagePicRef}
            accept='image/*'
            onChange={addImageToPost}
          />
          <button
            type='button'
            className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'
            disabled={text.trim() === '' || postLoading || loading}
            onClick={handleSubmit}
          >
            {postLoading ? 'please wait...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  )
}
export default Input
