import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizzFirebaseServiceService {
  firestore = inject(Firestore)
  quizzCollection = collection(this.firestore, 'responses');

  async saveString(value: string): Promise<DocumentReference> {
    const docRef = await addDoc(collection(this.firestore, 'responses'), {
      content: value,
    });
    return docRef;
  }

  async saveStringInDoc(docId: string, questionNb: number, reponse: string): Promise<void> {
    const docRef = doc(this.firestore, 'responses', docId);
    await updateDoc(docRef, {
      ['q'+(questionNb-1)]: reponse,
    });
  }

  async saveNewDoc(): Promise<DocumentReference> {
    const docRef = await addDoc(this.quizzCollection, {});
    return docRef;
  }

  constructor() { }
}
