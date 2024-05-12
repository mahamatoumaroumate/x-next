'use client'
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { app } from '@/firebase'
import { useEffect, useState } from 'react'
import Comment from './Comment'
const Comments = ({ id }) => {
  const db = getFirestore(app)
  const [comments, setComments] = useState([])
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'post', id, 'comments'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        setComments(snapshot.docs)
      }
    )
  }, [db, id])

  return (
    <div>
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            commentId={comment.id}
            originalPostId={id}
            comment={comment.data()}
          />
        )
      })}
    </div>
  )
}
export default Comments
