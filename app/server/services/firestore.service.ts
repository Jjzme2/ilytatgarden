import { db } from '../core/firebase';

const getCollection = (collectionName: string) => db.collection(collectionName);

export const getAllDocuments = async <T>(collectionName: string): Promise<(T & { id: string })[]> => {
  const snapshot = await getCollection(collectionName).where('isActive', '==', true).get();
  const documents: (T & { id: string })[] = [];
  snapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() } as T & { id: string });
  });
  return documents;
};

export const getDocumentById = async <T>(collectionName: string, id: string): Promise<(T & { id: string }) | null> => {
  const doc = await getCollection(collectionName).doc(id).get();
  if (doc.exists) {
    const document = { id: doc.id, ...doc.data() } as T & { id: string };
    if ((document as any).isActive) {
      return document;
    }
  }
  return null;
};

export const createDocument = async <T>(collectionName: string, data: Omit<T, 'id'>): Promise<T & { id: string }> => {
  const docRef = await getCollection(collectionName).add(data);
  return { id: docRef.id, ...data } as T & { id: string };
};

export const updateDocument = async <T>(collectionName: string, id: string, data: Partial<T>): Promise<void> => {
  const docRef = getCollection(collectionName).doc(id);
  await docRef.update(data);
};

export const softDeleteDocument = async (collectionName: string, id: string): Promise<void> => {
  const docRef = getCollection(collectionName).doc(id);
  await docRef.update({ isActive: false });
};
