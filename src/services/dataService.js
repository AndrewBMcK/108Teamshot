import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

class DataService {
    async getGames() {
        const allDocs = await getDocs(collection(db, "games"));
        return allDocs.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }

    async getUsers() {
        const allDocs = await getDocs(collection(db, "users"));
        return allDocs.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }
}

export default new DataService();