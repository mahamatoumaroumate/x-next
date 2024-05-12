'use client'

import { modalState, postIdState } from '@/atom/modalAtom'
import { app } from '@/firebase'
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import {
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
  HiHeart,
} from 'react-icons/hi'
import { useRecoilState } from 'recoil'
const Icons = ({ id, uid }) => {
  const { data: session } = useSession()
  const [isLiked, setIsLiked] = useState(false)
  const [open, setOpen] = useRecoilState(modalState)
  const [postId, setPostId] = useRecoilState(postIdState)
  const [likes, setLikes] = useState([])
  const [comments, setComments] = useState([])
  const db = getFirestore(app)
  const likesPosts = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(doc(db, 'post', id, 'likes', session?.user.uid))
      } else {
        await setDoc(doc(db, 'post', id, 'likes', session.user.uid), {
          username: session.user.username,
          timestamp: serverTimestamp(),
        })
      }
    } else {
      signIn()
    }
  }
  useEffect(() => {
    setIsLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1)
  }, [likes])
  useEffect(() => {
    onSnapshot(collection(db, 'post', id, 'likes'), (snapshot) => {
      setLikes(snapshot.docs)
    })
  }, [db])
  const deletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post')) {
      if (session?.user?.uid === uid) {
        deleteDoc(doc(db, 'post', id))
          .then(() => {
            window.location.reload()
          })
          .catch((error) => {
            console.log('Error removing document:', error)
          })
      } else {
        alert('You are not authorized to delete this post')
      }
    }
  }
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'post', id, 'comments'),
      (snapshot) => setComments(snapshot.docs)
    )
    return () => unsubscribe()
  }, [db, id])
  return (
    <div className='flex justify-start gap-5 p-2 text-gray-500 '>
      <div className='flex items-center'>
        <HiOutlineChat
          className='h-8 w-8 cursor-pointer rounded-full transition duration-200 ease-in-out p-2 text-sky-500 hover:bg-sky-100'
          onClick={() => {
            if (!session) {
              signIn()
            } else {
              setOpen(!open)
              setPostId(id)
            }
          }}
        />
        {comments.length > 0 && (
          <span className='text-xs'>{comments.length}</span>
        )}
      </div>
      <div className='flex items-center'>
        {isLiked ? (
          <HiHeart
            className='h-8 w-8 cursor-pointer rounded-full transition duration-200 ease-in-out p-2 text-red-500 hover:bg-red-100'
            onClick={likesPosts}
          />
        ) : (
          <HiOutlineHeart
            className='h-8 w-8 cursor-pointer rounded-full transition duration-200 ease-in-out p-2 text-red-500 hover:bg-red-100'
            onClick={likesPosts}
          />
        )}
      </div>
      <div className='flex items-center'>
        {session?.user?.uid === uid && (
          <HiOutlineTrash
            className='h-8 w-8 cursor-pointer rounded-full transition duration-200 ease-in-out p-2 text-red-500 hover:bg-red-100'
            onClick={deletePost}
          />
        )}
      </div>
    </div>
  )
}
export default Icons
