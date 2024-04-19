import { Injectable, inject } from '@angular/core';
import { get } from '@angular/fire/database';
import { DocumentData, DocumentReference, DocumentSnapshot, Firestore, QueryDocumentSnapshot, addDoc, collection, collectionData, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Resultat } from './result/resultat';

@Injectable({
  providedIn: 'root'
})
export class QuizzFirebaseServiceService {
  firestore = inject(Firestore)
  quizzCollection = collection(this.firestore, 'responses');

  resultat: Resultat = new Resultat;

  async saveString(value: string): Promise<DocumentReference> {
    const docRef = await addDoc(collection(this.firestore, 'responses'), {
      content: value,
    });
    return docRef;
  }

  async saveStringInDoc(docId: string, questionNb: number, reponse: string): Promise<void> {
    const docRef = doc(this.firestore, 'responses', docId);
    await updateDoc(docRef, {
      ['q'+(questionNb)]: reponse,
    });
  }

  async saveNewDoc(): Promise<DocumentReference> {
    const docRef = await addDoc(this.quizzCollection, {});
    return docRef;
  }

  async getResponsesByUSer(docId: string): Promise<Resultat> {
    const docRef = doc(this.firestore, "responses", docId);
    const docSnap = await getDoc(docRef);
    this.resultat!.q1 = docSnap.get("q1");
    this.resultat!.q2 = docSnap.get("q2");
    this.resultat!.q3 = docSnap.get("q3");
    this.resultat!.q4 = docSnap.get("q4");
    return this.resultat;
  }

  constructor() { }
}
