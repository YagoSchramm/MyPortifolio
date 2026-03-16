import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  
  updateDoc,
} from "firebase/firestore"
import { db } from "../firebase"

const postsCollection = collection(db, "posts")

export const createPost = async ({ title, summary, content } = {}) => {
  const payload = {
    title: title ?? "",
    summary: summary ?? "",
    content: content ?? "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
  const docRef = await addDoc(postsCollection, payload)
  return { id: docRef.id, ...payload }
}

export const updatePost = async (id, data = {}) => {
  const docRef = doc(db, "posts", id)
  const payload = {
    ...data,
    updatedAt: serverTimestamp(),
  }
  await updateDoc(docRef, payload)
  return { id, ...payload }
}

export const deletePost = async (id) => {
  const docRef = doc(db, "posts", id)
  await deleteDoc(docRef)
  return { id }
}

export const getPost = async (id) => {
  const docRef = doc(db, "posts", id)
  const snapshot = await getDoc(docRef)
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() }
}

export const listPosts = async ({ limitCount = 20 } = {}) => {
  const q = query(postsCollection, orderBy("createdAt", "desc"), limit(limitCount))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
}

export const listPostsPage = async ({ limitCount = 12, startAfterDoc = null } = {}) => {
  const base = [orderBy("createdAt", "desc"), limit(limitCount)]
  const q = startAfterDoc
    ? query(postsCollection, ...base, startAfter(startAfterDoc))
    : query(postsCollection, ...base)
  const snapshot = await getDocs(q)
  return {
    items: snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })),
    lastDoc: snapshot.docs[snapshot.docs.length - 1] ?? null,
  }
}
