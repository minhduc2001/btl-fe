import axios from "axios";
import { deleteBookRoute, listBooksRoute } from "./APIRoutes";
class CallAPI {
    async listBooks() {
        const { data } = await axios.get(listBooksRoute);
        return data.data;
    }

    async deleteBook(id) {
        await axios.delete(`${deleteBookRoute}/${id}`);
    }

    async getBook(id) {
        const data = await axios.get(`${listBooksRoute}/${id}`);
        return data.data;
    }
}

export default new CallAPI();